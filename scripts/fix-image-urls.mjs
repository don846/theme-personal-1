import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const roots = ['dist', 'dist/client'];
const imagePattern = /\/_image\/?\?href=([^"'>\s]+)/g;

async function walk(dir, files = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(path, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(path);
    }
  }
  return files;
}

function rewrite(html) {
  return html.replace(imagePattern, (_match, hrefPart) => {
    const encoded = hrefPart.split('&')[0];
    try {
      return decodeURIComponent(encoded);
    } catch {
      return encoded;
    }
  });
}

let changed = 0;
let remaining = 0;
const seen = new Set();

for (const root of roots) {
  for (const file of await walk(root)) {
    if (seen.has(file)) continue;
    seen.add(file);
    const original = await readFile(file, 'utf8');
    const next = rewrite(original);
    if (next !== original) {
      await writeFile(file, next);
      changed += 1;
    }
    remaining += (next.match(/\/_image/) || []).length;
  }
}

console.log(`fix-image-urls: rewrote ${changed} html file(s); remaining /_image: ${remaining}`);
if (remaining > 0) {
  process.exit(1);
}
