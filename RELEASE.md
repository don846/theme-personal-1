# Release Guide

## How to cut a release

Make sure your working tree is clean and you are on the `main` branch.

```bash
# Bug fix (0.0.1 → 0.0.2)
npm run release:patch

# New feature, backwards-compatible (0.0.1 → 0.1.0)
npm run release:minor

# Breaking change (0.0.1 → 1.0.0)
npm run release:major
```

That single command:
1. Bumps `version` in `package.json`
2. Creates a git commit (`chore: release 0.0.2`)
3. Creates a git tag (`0.0.2`)
4. Pushes the commit and tag to `origin/main`

GitHub Actions then runs automatically:

| Workflow | Trigger | What it does |
|---|---|---|
| `create-github-release.yml` | tag push | Creates a GitHub Release with auto-generated notes |
| `release-to-r2.yml` | tag push | Zips and uploads the theme to Cloudflare R2 |

---

## Which version type to use

Follow [Semantic Versioning](https://semver.org):

| Change | Type | Example |
|---|---|---|
| Typo fix, minor style tweak | `patch` | `0.1.0 → 0.1.1` |
| New section, new component, new page | `minor` | `0.1.0 → 0.2.0` |
| Restructured file layout, renamed config keys, dropped Astro version | `major` | `0.1.0 → 1.0.0` |

---

## Before releasing

- You must have push access to `origin/main`
- Run `npm run build` locally to confirm there are no build errors
- Commit or stash all local changes — `npm version` will fail on a dirty tree
