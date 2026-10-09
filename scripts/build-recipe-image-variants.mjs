import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { loadEnv } from 'vite';

// Run explicitly after photo changes. Builds display copies without modifying Supabase.
const root = resolve(import.meta.dirname, '..');
const env = loadEnv('production', root, 'VITE_');
const base = env.VITE_SUPABASE_URL || 'https://gcpqkxahkqkanolrjrhb.supabase.co';
const key = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_WPoUYSE_YVGRzNa-lVZaYw_kEClO01t';
const response = await fetch(`${base}/rest/v1/recipes?select=*`, { headers: { apikey: key } });
if (!response.ok) throw new Error(`Public recipes request failed: ${response.status}`);
const recipes = await response.json();
const images = [...new Set(recipes.filter(row => !(row.is_draft ?? row.isDraft ?? row.author?.isDraft ?? (row.status === 'draft'))).map(row => row.image).filter(image => typeof image === 'string' && image.startsWith(`${base}/storage/v1/object/public/recipe-images/`)))];
const directory = resolve(root, 'public/images/recipe-thumbnails');
await mkdir(directory, { recursive: true });
const manifest = {};
let sourceBytes = 0;
let smallBytes = 0;
for (const image of images) {
  const photo = await fetch(image);
  if (!photo.ok) throw new Error(`Public photo request failed: ${photo.status}`);
  const source = Buffer.from(await photo.arrayBuffer());
  const hash = createHash('sha256').update(source).digest('hex').slice(0, 16);
  const metadata = await sharp(source).metadata();
  const widths = [...new Set([320, 480, 640, 800, 960, 1280].map(width => Math.min(width, metadata.width)))];
  const variants = [];
  for (const width of widths) {
    const filename = `${hash}-${width}.webp`;
    const buffer = await sharp(source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toBuffer();
    await writeFile(resolve(directory, filename), buffer);
    const info = await sharp(buffer).metadata();
    variants.push({ path: `images/recipe-thumbnails/${filename}`, width: info.width, height: info.height, bytes: buffer.length });
  }
  manifest[image] = variants;
  sourceBytes += source.length;
  smallBytes += variants.find(variant => variant.width >= 640)?.bytes ?? variants.at(-1).bytes;
}
await writeFile(resolve(root, 'src/data/recipeImageVariants.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated ${images.length} public recipe photo sets. Originals: ${sourceBytes} bytes; 640px variants: ${smallBytes} bytes.`);
