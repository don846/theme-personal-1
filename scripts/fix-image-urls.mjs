import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const roots = ['dist', 'dist/client'];
const imagePattern = /\/_image\/?\?href=([^"'>\s]+)/g;

const lockdownRobotsTxt = `User-agent: *
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: OAI-SearchBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: Perplexity-User
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: cohere-ai
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /
`;

const lockdownHeadersTxt = `/*
  X-Robots-Tag: noindex, nofollow, noarchive, nosnippet, noimageindex, noai, noimageai
`;

const robotsMetaTags = [
  '<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex, noai, noimageai">',
  '<meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet, noimageindex">',
  '<meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet, noimageindex">',
];

const robotsMetaPattern = /<meta\s+[^>]*name=["'](?:robots|googlebot|bingbot)["'][^>]*>/gi;

function applyPreviewLockdown(html) {
  const withoutExistingRobots = html.replace(robotsMetaPattern, '');
  const tags = robotsMetaTags.map((tag) => '    ' + tag).join('\n');
  if (/<head[\s>]/i.test(withoutExistingRobots)) {
    return withoutExistingRobots.replace(/<head([^>]*)>/i, (match) => match + '\n' + tags);
  }
  if (/<!doctype html>/i.test(withoutExistingRobots)) {
    return withoutExistingRobots.replace(/<!doctype html>/i, (match) => match + '\n' + tags);
  }
  return tags + '\n' + withoutExistingRobots;
}


async function writePreviewLockdownFiles(root) {
  try {
    await writeFile(join(root, 'robots.txt'), lockdownRobotsTxt);
    await writeFile(join(root, '_headers'), lockdownHeadersTxt);
    return true;
  } catch {
    return false;
  }
}

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
  await writePreviewLockdownFiles(root);
  for (const file of await walk(root)) {
    if (seen.has(file)) continue;
    seen.add(file);
    const original = await readFile(file, 'utf8');
    const next = applyPreviewLockdown(rewrite(original));
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

// --- Social Power preview lockdown: block search engines & AI crawlers ---
const __spLockdownRobotsTxt = `User-agent: *
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: OAI-SearchBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: Perplexity-User
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: cohere-ai
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /
`;

const __spLockdownHeadersTxt = `/*
  X-Robots-Tag: noindex, nofollow, noarchive, nosnippet, noimageindex, noai, noimageai
`;

const __spRobotsMetaTags = [
  '<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex, noai, noimageai">',
  '<meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet, noimageindex">',
  '<meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet, noimageindex">',
];

const __spRobotsMetaPattern = /<meta\s+[^>]*name=["'](?:robots|googlebot|bingbot)["'][^>]*>/gi;

function __spApplyPreviewLockdown(html) {
  const withoutExistingRobots = html.replace(__spRobotsMetaPattern, '');
  const tags = __spRobotsMetaTags.map((tag) => '    ' + tag).join('\n');
  if (/<head[\s>]/i.test(withoutExistingRobots)) {
    return withoutExistingRobots.replace(/<head([^>]*)>/i, (match) => match + '\n' + tags);
  }
  if (/<!doctype html>/i.test(withoutExistingRobots)) {
    return withoutExistingRobots.replace(/<!doctype html>/i, (match) => match + '\n' + tags);
  }
  return tags + '\n' + withoutExistingRobots;
}

async function __spApplyShowroomLockdown() {
  const { readdir, readFile, writeFile } = await import('node:fs/promises');
  const { join } = await import('node:path');
  const roots = ['dist', 'dist/client'];

  async function walkHtml(dir, files = []) {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return files;
    }
    for (const entry of entries) {
      const p = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walkHtml(p, files);
      } else if (entry.name.endsWith('.html')) {
        files.push(p);
      }
    }
    return files;
  }

  let htmlPatched = 0;
  const seen = new Set();
  for (const root of roots) {
    try {
      await writeFile(join(root, 'robots.txt'), __spLockdownRobotsTxt);
      await writeFile(join(root, '_headers'), __spLockdownHeadersTxt);
    } catch {
      // root may not exist (e.g. no dist/client) — fine, skip.
    }
    for (const file of await walkHtml(root)) {
      if (seen.has(file)) continue;
      seen.add(file);
      const original = await readFile(file, 'utf8');
      const next = __spApplyPreviewLockdown(original);
      if (next !== original) {
        await writeFile(file, next);
        htmlPatched += 1;
      }
    }
  }
  console.log(`sp-showroom-lockdown: patched ${htmlPatched} html file(s); robots.txt + _headers written.`);
}

await __spApplyShowroomLockdown();
