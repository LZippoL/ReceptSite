import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const manifest = JSON.parse(await readFile(resolve(root, 'src/data/recipeImageVariants.json'), 'utf8'));
assert.ok(Object.keys(manifest).length > 0);
let count = 0;
for (const variants of Object.values(manifest)) {
  assert.ok(variants.length > 1, 'Every cached recipe photo needs responsive sizes.');
  const widths = variants.map(variant => variant.width);
  assert.deepEqual(widths, [...new Set(widths)].sort((a, b) => a - b));
  for (const variant of variants) {
    const path = resolve(root, 'public', variant.path);
    const metadata = await sharp(path).metadata();
    assert.equal(metadata.format, 'webp');
    assert.equal(metadata.width, variant.width);
    assert.equal(metadata.height, variant.height);
    assert.equal((await stat(path)).size, variant.bytes);
    count++;
  }
}
const buildDir = resolve(root, process.env.SITE_BUILD_DIR || 'output/cloudflare/build');
const sw = await readFile(resolve(buildDir, 'sw.js'), 'utf8');
assert.ok(!sw.includes('url:"images/recipe-thumbnails/'), 'Installing the app must not download every image size.');
assert.ok(sw.includes('recipe-thumbnails'), 'Viewed images should have a runtime cache.');
console.log(`Verified ${count} WebP files: dimensions, source sets, bytes and on-demand offline caching.`);
