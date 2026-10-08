import { randomUUID } from 'node:crypto';
import { recipeSchema, articleSchema, idSchema, cleanArticle } from './schemas.mjs';

const recipeFields = { prepTime: 'prep_time', cookTime: 'cook_time', totalTime: 'total_time', reviewsCount: 'reviews_count', createdAt: 'created_at', updatedAt: 'updated_at' };
const articleFields = { readTime: 'read_time', relatedRecipeSlugs: 'related_recipe_slugs', createdAt: 'created_at', updatedAt: 'updated_at', isDeleted: 'is_deleted' };
export function mapFields(data, fields, reverse = false) {
  const mapping = reverse ? Object.fromEntries(Object.entries(fields).map(([a, b]) => [b, a])) : fields;
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [mapping[key] || key, value]));
}
export class ContentRepository {
  constructor(client) { this.client = client; }
  fields(kind) { return kind === 'recipes' ? recipeFields : articleFields; }
  check(result) {
    if (result.error) {
      // Database errors can contain data supplied by users. Never expose keys/configuration.
      if (result.error.code === '23505') throw new Error('This slug or ID already exists. Choose another slug.');
      if (['42P01', 'PGRST205'].includes(result.error.code)) throw new Error('Content table is missing. Apply the SQL migration in mcp/sql first.');
      throw new Error(`Database operation failed (${result.error.code || 'unknown'}). Check schema and permissions.`);
    }
    return result.data;
  }
  async list(kind, { query = '', limit = 20, offset = 0 } = {}) {
    let request = this.client.from(kind).select('*').order('created_at', { ascending: false });
    if (kind === 'recipes') request = request.neq('category', 'system').not('id', 'like', '__SYSTEM_%');
    else request = request.eq('is_deleted', false);
    if (query) request = request.ilike('title', `%${query.replace(/[\\%_]/g, '\\$&')}%`);
    const rows = this.check(await request.range(offset, offset + limit - 1)) || [];
    return rows.map(row => {
      const mapped = mapFields(row, this.fields(kind), true);
      const { content, ingredients, instructions, ...summary } = mapped;
      return summary;
    });
  }
  async get(kind, id) {
    idSchema.parse(id);
    const row = this.check(await this.client.from(kind).select('*').eq('id', id).maybeSingle());
    if (!row || row.category === 'system' || row.is_deleted) throw new Error('Content not found');
    return mapFields(row, this.fields(kind), true);
  }
  payload(kind, input, existing) {
    const schema = kind === 'recipes' ? recipeSchema : articleSchema;
    // Read only writable fields from the stored row; legacy ingredient IDs/step numbers are generated below.
    const writable = existing ? Object.fromEntries(Object.keys(schema.shape).map(key => [key, existing[key]]).filter(([, value]) => value !== undefined)) : {};
    if (writable.author) writable.author = Object.fromEntries(Object.entries(writable.author).filter(([key]) => ['name', 'avatar', 'role'].includes(key)));
    if (writable.ingredients) writable.ingredients = writable.ingredients.map(({ id, ...ingredient }) => ingredient);
    if (writable.instructions) writable.instructions = writable.instructions.map(({ stepNumber, ...step }) => step);
    const parsed = schema.parse({ ...writable, ...input });
    const now = new Date().toISOString();
    const value = { ...parsed, updatedAt: now };
    if (!existing) Object.assign(value, { id: `${kind === 'recipes' ? 'custom' : 'art-custom'}-${randomUUID()}`, createdAt: now });
    if (kind === 'recipes') {
      value.totalTime = value.prepTime + value.cookTime;
      value.ingredients = value.ingredients.map((ingredient, index) => ({ ...ingredient, id: existing?.ingredients?.[index]?.id || randomUUID() }));
      value.instructions = value.instructions.map((step, index) => ({ ...step, stepNumber: index + 1 }));
      // The existing admin stores recipe publication state inside author JSON.
      value.author = { ...existing?.author, ...value.author, status: 'published', isDraft: false };
      if (!existing) Object.assign(value, { rating: 0, reviewsCount: 0 });
    } else {
      value.content = cleanArticle(value.content);
      value.isDeleted = false;
    }
    return mapFields(value, this.fields(kind));
  }
  async create(kind, input) {
    const payload = this.payload(kind, input);
    const row = this.check(await this.client.from(kind).insert(payload).select('*').single());
    return mapFields(row, this.fields(kind), true);
  }
  async update(kind, id, input) {
    const existing = await this.get(kind, id);
    const row = this.check(await this.client.from(kind).update(this.payload(kind, input, existing)).eq('id', id).select('*').single());
    return mapFields(row, this.fields(kind), true);
  }
  async delete(kind, id, confirmTitle) {
    const existing = await this.get(kind, id);
    if (confirmTitle !== existing.title) throw new Error('confirmTitle must exactly match the current content title');
    const request = kind === 'articles'
      ? this.client.from(kind).update({ is_deleted: true, status: 'published', updated_at: new Date().toISOString() }).eq('id', id).eq('title', confirmTitle).select('id')
      : this.client.from(kind).delete().eq('id', id).eq('title', confirmTitle).select('id');
    const rows = this.check(await request);
    if (!rows?.length) throw new Error('Content changed or was already removed. Read it again.');
    return { deleted: true, id };
  }
}
