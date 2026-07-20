# Eject Components Reference

Eject copies a built-in component's source code into your project for full customization. This is the heaviest approach — ejected components do not receive automatic updates when Rspress upgrades. Prefer CSS variables, BEM overrides, or Layout slots whenever possible.

Official reference: <https://rspress.rs/api/commands>

---

## Eject Command

```bash
# List all available components
rspress eject

# Eject a specific component
rspress eject <ComponentName>
```

Ejected source is placed in `theme/components/<ComponentName>/`.

## Available Components

| Component        | Description                               | Consider wrapping first?                         |
| ---------------- | ----------------------------------------- | ------------------------------------------------ |
| `Layout`         | Main layout container with all slot props | Yes — use Layout slots instead                   |
| `Root`           | Application root wrapper                  | Only eject for global providers                  |
| `Banner`         | Notification banner at top of page        | Check `top` slot first                           |
| `NavTitle`       | Navigation logo and title                 | Check `navTitle` / `beforeNavTitle` slots        |
| `HomeLayout`     | Complete home page layout                 | Check home page slots first                      |
| `HomeHero`       | Hero section on home page                 | Check `beforeHero` / `afterHero` slots           |
| `HomeFeature`    | Feature grid cards                        | Check `beforeFeatures` / `afterFeatures` slots   |
| `HomeBackground` | Home page background effects              | Try CSS variables first                          |
| `HomeFooter`     | Home page footer                          | Check `bottom` slot first                        |
| `DocFooter`      | Documentation page footer                 | Check `beforeDocFooter` / `afterDocFooter` slots |
| `EditLink`       | "Edit this page" link                     | Configure via `themeConfig.editLink`             |
| `LastUpdated`    | Last updated timestamp                    | Usually config is enough                         |
| `PrevNextPage`   | Previous/next page navigation             | Check `beforeDocFooter` slot                     |
| `OverviewGroup`  | Overview page group cards                 | —                                                |
| `Tag`            | Tag/label component                       | —                                                |

## Step-by-Step Eject Workflow

1. **Eject the component:**

   ```bash
   rspress eject DocFooter
   ```

2. **Re-export in theme/index.tsx:**

   ```tsx
   // theme/index.tsx
   export * from '@rspress/core/theme-original';
   export { DocFooter } from './components/DocFooter';
   ```

   The named export takes precedence over the wildcard re-export, so Rspress uses your custom version.

3. **Modify the ejected source** in `theme/components/DocFooter/`.

## Common Pattern: Root for Global Providers

The most common eject use case is wrapping the entire app in a context provider (state management, analytics, auth, etc.):

```tsx
// theme/components/Root/index.tsx
import type { RootProps } from '@rspress/core/theme';

export function Root({ children }: RootProps) {
  return (
    <ThemeProvider>
      <AnalyticsProvider>{children}</AnalyticsProvider>
    </ThemeProvider>
  );
}
```

```tsx
// theme/index.tsx
export * from '@rspress/core/theme-original';
export { Root } from './components/Root';
```

## Common Pattern: Custom Home Page (HomeLayout)

When the default home page structure (Hero + Features) doesn't meet the design requirements — for example, you need a completely different landing page with custom sections, animations, or a non-standard layout — write a custom `HomeLayout` component and re-export it directly:

```tsx
// theme/components/HomeLayout/index.tsx
import { useSite, useLang } from '@rspress/core/runtime';

export function HomeLayout() {
  const site = useSite();
  const lang = useLang();
  const { title, description } = site.siteData;

  return (
    <div className="custom-home">
      <section className="hero">
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="hero-actions">
          <a
            href={lang === 'zh' ? '/zh/guide/start' : '/guide/start'}
            className="primary-btn"
          >
            Get Started
          </a>
          <a href="https://github.com/..." className="secondary-btn">
            GitHub
          </a>
        </div>
      </section>

      <section className="showcase">
        {/* Custom content: testimonials, stats, demos, etc. */}
      </section>
    </div>
  );
}
```

```tsx
// theme/index.tsx
export * from '@rspress/core/theme-original';
export { HomeLayout } from './components/HomeLayout';
```

The named export overrides the built-in `HomeLayout` from the wildcard re-export — no need to eject first.

If you only need to add content before/after the Hero or Features sections (without replacing the entire home page), prefer Layout slots (`beforeHero`, `afterHero`, `beforeFeatures`, `afterFeatures`) instead — see `references/layout-slots.md`.

## Common Pattern: Custom Doc Footer

```tsx
// theme/components/DocFooter/index.tsx
import { useFrontmatter } from '@rspress/core/runtime';

export function DocFooter() {
  const frontmatter = useFrontmatter();
  return (
    <footer className="custom-doc-footer">
      {frontmatter.author && <span>Author: {frontmatter.author}</span>}
      <a href="https://github.com/...">Edit this page</a>
    </footer>
  );
}
```

## Important Notes

- Always import from `@rspress/core/theme-original` in `theme/` files, never from `@rspress/core/theme` (the latter resolves to your own `theme/index.tsx`, causing circular imports).
- After ejecting, you own that component. Track Rspress changelogs for upstream changes you might want to incorporate manually.
- Run `rspress eject` (no args) to see the up-to-date list of available components — the list above may change between Rspress versions.
