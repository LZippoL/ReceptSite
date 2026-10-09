import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Display copies of existing public photos; source images and database stay intact.
const names = ['1791455219797-h3orsd', '1791455369130-7mhqyl', '1791455679642-2uw5tt'];
const directory = resolve(import.meta.dirname, '../public/images/recipe-thumbnails');
await mkdir(directory, { recursive: true });
for (const name of names) {
  const response = await fetch(`https://gcpqkxahkqkanolrjrhb.supabase.co/storage/v1/object/public/recipe-images/recipes/${name}.png`);
  if (!response.ok) throw new Error(`Photo download failed: ${response.status}`);
  const source = Buffer.from(await response.arrayBuffer());
  const thumbnail = await sharp(source).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
  await writeFile(resolve(directory, `${name}.webp`), thumbnail);
  console.log(`${name}: ${source.length} -> ${thumbnail.length} bytes`);
}
