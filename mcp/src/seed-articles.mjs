// Produces data for the authorized SQL import. Does not connect to a database.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from '../../node_modules/typescript/lib/typescript.js';
import { ContentRepository } from './repository.mjs';
const source = fs.readFileSync(fileURLToPath(new URL('../../src/data/articles/initialArticles.ts', import.meta.url)), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { INITIAL_ARTICLES } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
const repository = new ContentRepository(null);
const rows = INITIAL_ARTICLES.map(({ id, createdAt, ...article }) => ({
  ...repository.payload('articles', { ...article, status: 'published' }), id, created_at: createdAt
}));
process.stdout.write(JSON.stringify(rows));
