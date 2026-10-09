const originals = new Set([
  '1791455219797-h3orsd.png',
  '1791455369130-7mhqyl.png',
  '1791455679642-2uw5tt.png'
]);
const sourcePrefix = 'https://gcpqkxahkqkanolrjrhb.supabase.co/storage/v1/object/public/recipe-images/recipes/';

export function recipeThumbnail(image: string | undefined): string | undefined {
  if (!image?.startsWith(sourcePrefix)) return image;
  const filename = image.slice(sourcePrefix.length);
  return originals.has(filename)
    ? `${import.meta.env.BASE_URL}images/recipe-thumbnails/${filename.replace(/\.png$/, '.webp')}`
    : image;
}
