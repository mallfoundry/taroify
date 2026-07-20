# Rspress Version Guard

Use this path when a docs site exists but may depend on Rspress v1, or when a newly scaffolded docs site must be checked before content work. This skill should keep documentation work on Rspress v2 and avoid accidentally creating or maintaining a stale v1 project.

1. Check the docs project's dependencies and imports:
   - Rspress v2 projects should depend on `@rspress/core` with a 2.x range.
   - A `rspress` package dependency, `@rspress/core` 1.x, `@rspress/theme-default`, `@rspress/runtime`, or imports such as `rspress/runtime` and `rspress/theme` are v1 migration signals.
2. If the site is already on Rspress v2, continue with [Maintain Docs For PRs](maintain-docs-for-prs.md).
3. If v1 migration signals are present, do not perform the full migration in this skill. Report that the docs site must be upgraded first and use the dedicated `rspress-v2-upgrade` skill for the migration.
4. Keep the official migration guide as the fallback source of truth if the upgrade skill is unavailable or more detail is needed:
   - Migration guide: <https://rspress.rs/guide/migration/rspress-1-x>
   - Legacy Rspress 1.x docs: <https://v1.rspress.rs>
5. After the upgrade build passes, return to this skill for source-backed documentation updates.
