import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface UploadResult {
  url: string;
  path: string;
}

export const storageService = {
  /**
   * Upload an image file to Supabase Storage 'recipe-images' bucket
   * @param file File object from <input type="file">
   * @param folder optional folder prefix, e.g. 'recipes', 'reviews', 'articles'
   */
  async uploadImage(file: File, folder: 'recipes' | 'reviews' | 'articles' = 'recipes'): Promise<UploadResult> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('Увійдіть, щоб завантажити фото');
    const extensions: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif', 'image/gif': 'gif' };
    if (!extensions[file.type]) throw new Error('Оберіть зображення JPEG, PNG, WebP, AVIF або GIF');
    if (file.size > 5 * 1024 * 1024) throw new Error('Розмір фото має бути до 5 МБ');
    const cleanFileName = `${crypto.randomUUID()}.${extensions[file.type]}`;
    const filePath = folder === 'reviews' ? `reviews/${user.id}/${cleanFileName}` : `${folder}/${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from('recipe-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data: publicData } = supabase.storage
      .from('recipe-images')
      .getPublicUrl(filePath);

    return {
      url: publicData.publicUrl,
      path: filePath
    };
  }
};
