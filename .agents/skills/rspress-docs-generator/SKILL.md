---
name: rspress-docs-generator
description: Generate or maintain Rspress documentation for a project. Use whenever the user wants to create a new Rspress v2 docs site, add docs for user-facing feature work or PRs, maintain a dedicated Rspress docs project in a monorepo, or prevent stale Rspress v1 scaffolds/version drift before documentation work. For full v1-to-v2 migration, hand off to the rspress-v2-upgrade skill.
---

# Rspress Docs Generator

Create and maintain Rspress documentation as part of normal project work. Prefer source-backed docs over generic prose: read the code, tests, examples, package metadata, and existing README before writing.

## Use Cases

- Create a new Rspress v2 documentation site for a project that has no docs site yet.
- Update an existing Rspress v2 docs site for a user-facing feature, API change, CLI change, or PR.
- Detect Rspress v1 version markers before documentation work and hand migration to the dedicated `rspress-v2-upgrade` skill.
- Integrate Rspress documentation into an Rslib package or workspace while preserving the repository's package manager and scripts.

## Workflow

1. **Inspect the project**
   - Locate package files, source entry points, examples, tests, changelogs, and README files.
   - Search for Rspress config files: `rspress.config.ts`, `.js`, `.mjs`, or `.cjs`.
   - Inspect dependencies for Rspress version markers: `@rspress/core` version, legacy `rspress` package or `rspress/*` imports, and `@rspress/plugin-*`.
   - Detect the package manager and workspace setup from lock files (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`, `bun.lock`, `bun.lockb`) and `pnpm-workspace.yaml`.
   - If a config exists, resolve the docs root from its `root` option. When `root` is absent, inspect package scripts, CI commands, and documented commands for Rspress CLI positional roots such as `rspress dev site`, `rspress build site`, or `rspress preview site`; use that argument before falling back to Rspress's default `docs/` directory relative to the config file's project cwd. If no config exists, check common roots such as `docs/`, `doc/`, `website/`, and `site/`.

2. **Choose the correct path**
   - If no Rspress docs site exists, follow [Create New Docs](references/create-new-docs.md).
   - If a Rspress docs site exists but appears to be v1, follow [Rspress Version Guard](references/rspress-version-guard.md) before editing docs.
   - If a Rspress v2 docs site exists, follow [Maintain Docs For PRs](references/maintain-docs-for-prs.md).

3. **Validate before finishing**
   - Run the docs build from the Rspress project directory or through the repo's root script.
   - The build must pass as the primary success criterion.
   - Fix broken links, missing navigation entries, invalid frontmatter, and failed MDX imports before reporting completion.

## Code Examples

Use the repository's package manager when creating or validating docs:

```bash
# Create a new Rspress docs site with the detected package manager.
# Replace pnpm with npm, yarn, or bun when that is the repo package manager.
pnpm create rspress@latest

# Validate from the docs project after replacing starter content.
pnpm run build
```

When maintaining docs for a PR, inspect the changed source first, then update the matching docs page and navigation:

```text
src/formatBytes.ts -> website/docs/api/formatBytes.mdx -> website/docs/api/_meta.json
```

## Reference

- [Documentation structure conventions](references/doc-structure-conventions.md) — how `_nav.json` and `_meta.json` work, with concrete examples for Guide/API sites, grouped sections, and i18n layouts.
- [Create New Docs](references/create-new-docs.md) — scaffold a Rspress v2 docs site from an undocumented project.
- [Maintain Docs For PRs](references/maintain-docs-for-prs.md) — update an existing Rspress v2 docs site for feature work.
- [Rspress Version Guard](references/rspress-version-guard.md) — detect v1 sites, avoid stale v1 scaffolds, and hand full migration to `rspress-v2-upgrade`.
