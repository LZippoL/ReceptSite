import { supabase, isSupabaseConfigured } from './supabaseClient';
import { storage } from './storageService';

export interface UserProfileRecord {
  id: string; // Supabase UUID
  friendlyId: string; // Short ID, e.g. UID-CABB1F3B
  email: string;
  displayName: string;
  createdAt: string;
  lastLoginAt: string;
  isBanned: boolean;
  banReason?: string;
  bannedAt?: string;
  isMuted: boolean;
  muteReason?: string;
  mutedUntil?: string; // ISO timestamp or 'permanent'
  mutedAt?: string;
}

const STORAGE_KEY = 'smakolyk_users_db';
const SYSTEM_STORE_ID = '__SYSTEM_USERS__';

export function generateFriendlyId(uuid: string): string {
  if (!uuid) return 'UID-00000000';
  const clean = uuid.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return `UID-${clean.slice(0, 8) || '00000000'}`;
}

export function isUserMutedActive(user: UserProfileRecord | null | undefined): boolean {
  if (!user || !user.isMuted) return false;
  if (!user.mutedUntil || user.mutedUntil === 'permanent') return true;
  const expiry = new Date(user.mutedUntil).getTime();
  return expiry > Date.now();
}

class UserService {
  private memoryCache: UserProfileRecord[] | null = null;
  private lastFetch = 0;
  private readonly CACHE_TTL = 3_000; // 3 seconds

  async getAll(forceFresh = true): Promise<UserProfileRecord[]> {
    if (!forceFresh && this.memoryCache && Date.now() - this.lastFetch < this.CACHE_TTL) {
      return this.memoryCache;
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('description')
          .eq('id', SYSTEM_STORE_ID)
          .maybeSingle();

        if (!error && data?.description) {
          try {
            const parsed = JSON.parse(data.description) as UserProfileRecord[];
            if (Array.isArray(parsed)) {
              this.memoryCache = parsed;
              this.lastFetch = Date.now();
              await storage.set(STORAGE_KEY, parsed);
              return parsed;
            }
          } catch (e) {
            console.warn('Failed to parse users JSON from DB:', e);
          }
        }
      } catch (err) {
        console.warn('Supabase fetch users failed:', err);
      }
    }

    const local = await storage.get<UserProfileRecord[]>(STORAGE_KEY, []);
    this.memoryCache = local;
    return local;
  }

  async getById(idOrFriendlyIdOrEmail: string, forceFresh = true): Promise<UserProfileRecord | null> {
    if (!idOrFriendlyIdOrEmail) return null;
    const users = await this.getAll(forceFresh);
    const query = idOrFriendlyIdOrEmail.toLowerCase().trim();
    return (
      users.find(
        (u) =>
          u.id.toLowerCase() === query ||
          u.friendlyId.toLowerCase() === query ||
          u.email.toLowerCase() === query
      ) || null
    );
  }

  async saveAll(users: UserProfileRecord[]): Promise<void> {
    this.memoryCache = users;
    this.lastFetch = Date.now();
    await storage.set(STORAGE_KEY, users);

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('recipes')
          .update({ description: JSON.stringify(users) })
          .eq('id', SYSTEM_STORE_ID);

        if (error) {
          await supabase
            .from('recipes')
            .upsert({
              id: SYSTEM_STORE_ID,
              slug: '__system_users__',
              title: 'System Users Store',
              description: JSON.stringify(users),
              category: 'system',
              cuisine: 'system',
              difficulty: 'easy',
              prep_time: 0,
              cook_time: 0,
              total_time: 0,
              servings: 1,
              calories: 0,
              image: '',
              rating: 0,
              reviews_count: 0,
              dietary: {},
              ingredients: [],
              instructions: [],
              tags: ['system'],
              author: { name: 'system' }
            });
        }
      } catch (err) {
        console.error('Failed to sync users to Supabase:', err);
      }
    }
  }

  async syncUser(user: {
    id: string;
    email?: string;
    user_metadata?: any;
    created_at?: string;
  }): Promise<UserProfileRecord> {
    // ALWAYS fetch fresh from Supabase to prevent overwriting admin ban/mute sanctions!
    const users = await this.getAll(true);
    const existingIndex = users.findIndex((u) => u.id === user.id);

    const friendlyId = generateFriendlyId(user.id);
    const email = user.email || `${friendlyId.toLowerCase()}@smakolyk.local`;
    const displayName =
      user.user_metadata?.full_name ||
      user.email?.split('@')[0] ||
      `Кулінар ${friendlyId}`;
    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      const existing = users[existingIndex];
      // CRUCIAL: Preserve existing isBanned, isMuted, banReason, mutedUntil from database!
      const updated: UserProfileRecord = {
        ...existing,
        email: existing.email || email,
        displayName: displayName || existing.displayName,
        lastLoginAt: now,
      };
      users[existingIndex] = updated;
      await this.saveAll(users);
      return updated;
    } else {
      const newUser: UserProfileRecord = {
        id: user.id,
        friendlyId,
        email,
        displayName,
        createdAt: user.created_at || now,
        lastLoginAt: now,
        isBanned: false,
        isMuted: false,
      };
      users.unshift(newUser);
      await this.saveAll(users);
      return newUser;
    }
  }
}

export const userService = new UserService();
