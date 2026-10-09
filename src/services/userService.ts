import { supabase } from './supabaseClient';
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

// Remove the legacy cache that contained other users' emails.
void storage.remove('smakolyk_users_db');

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

function mapProfile(row: any): UserProfileRecord {
  return { id: row.id, friendlyId: generateFriendlyId(row.id), email: row.email,
    displayName: row.display_name, createdAt: row.created_at, lastLoginAt: row.last_login_at,
    isBanned: row.is_banned || row.is_deleted, banReason: row.ban_reason || undefined,
    bannedAt: row.banned_at || undefined, isMuted: row.is_muted,
    muteReason: row.mute_reason || undefined,
    mutedUntil: row.is_muted ? (row.muted_until || 'permanent') : undefined,
    mutedAt: row.muted_at || undefined };
}

class UserService {
  async getById(id: string, _forceFresh = true): Promise<UserProfileRecord | null> {
    const { data, error } = await supabase.from('user_profiles').select('*').eq('id', id).maybeSingle();
    if (error) throw new Error('Не вдалося отримати профіль');
    return data ? mapProfile(data) : null;
  }
  async syncUser(user: { id: string; email?: string; user_metadata?: any; created_at?: string }): Promise<UserProfileRecord> {
    // Auth creates and synchronizes the profile on the server; clients never write moderation.
    const profile = await this.getById(user.id);
    if (!profile) throw new Error('Профіль ще не доступний');
    return profile;
  }
}
export const userService = new UserService();
