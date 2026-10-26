// Test-only ESM resolve hook (no dependencies). Maps the tsconfig "@/" alias
// to src/, adds .ts to extensionless relative imports inside src/, stubs
// 'server-only', and routes 'stripe' (imported from src/) through a stub that
// sends every Stripe request to the test's mocked global fetch.
import { existsSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const SRC = path.join(ROOT, 'src');
const STUB = pathToFileURL(path.join(ROOT, 'scripts', 'test', 'stripe-stub.mjs')).href;

function withExt(base) {
  for (const c of [base, base + '.ts', base + '.mjs', base + '.js', path.join(base, 'index.ts')]) {
    if (existsSync(c) && statSync(c).isFile()) return pathToFileURL(c).href;
  }
  return null;
}

export async function resolve(spec, ctx, next) {
  if (spec === 'server-only') return { url: 'data:text/javascript,export {}', shortCircuit: true };
  if (spec === 'next/server') return next('next/server.js', ctx);
  if (spec === 'stripe' && ctx.parentURL && ctx.parentURL !== STUB && ctx.parentURL.includes('/src/')) {
    return { url: STUB, shortCircuit: true };
  }
  if (spec.startsWith('@/')) {
    const hit = withExt(path.join(SRC, spec.slice(2)));
    if (hit) return { url: hit, shortCircuit: true };
  }
  if ((spec.startsWith('./') || spec.startsWith('../')) && ctx.parentURL?.startsWith('file:')) {
    const base = path.resolve(path.dirname(fileURLToPath(ctx.parentURL)), spec);
    if (!path.extname(base)) {
      const hit = withExt(base);
      if (hit) return { url: hit, shortCircuit: true };
    }
  }
  return next(spec, ctx);
}
// Some src files import TS-only types without `import type`; Node's type
// stripping cannot see that, so for the test run only, rewrite imports from
// '@/types...' to `import type`. Source files on disk are not changed.
export async function load(url, ctx, next) {
  const out = await next(url, ctx);
  if (url.startsWith('file:') && url.includes('/src/') && url.endsWith('.ts')) {
    const src = String(out.source);
    const fixed = src.replace(/^import \{([^}]*)\} from '(@\/types[^']*)';/gm, "import type {$1} from '$2';");
    if (fixed !== src) return { ...out, source: fixed };
  }
  return out;
}