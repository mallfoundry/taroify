---
name: rspress-custom-theme
description: Customize Rspress themes using CSS variables, Layout slots, component wrapping, or component ejection. Use when a user wants to change the look and feel of an Rspress site, override theme components, add custom navigation/sidebar/footer content, inject global providers, or modify the default Rspress theme in any way. Also use when a user mentions theme/index.tsx, Layout slots, BEM class overrides, or rspress eject.
---

# Rspress Custom Theme

Guide for customizing Rspress (v2) themes. Rspress offers four levels of customization, from lightest to heaviest. Always prefer the lightest approach that meets the requirement — lighter approaches are more maintainable and survive Rspress upgrades.

## Workflow

1. **Understand the user's goal** — what do they want to change? (colors, layout, inject content, replace a component entirely?)
2. **Pick the right level** using the decision flow below
3. **Set up `theme/index.tsx`** if needed (Levels 1A, 3, 4 all need it)
4. **Implement** following the patterns in this skill and reference files
5. **Verify** the user's Rspress version is v2 (imports use `@rspress/core/*` not `rspress/*`)

## Decision Flow

| User wants to...                                                 | Level | Approach                    |
| ---------------------------------------------------------------- | ----- | --------------------------- |
| Change brand colors, fonts, spacing, shadows                     | 1     | CSS variables               |
| Adjust a specific component's style (borders, padding, etc.)     | 2     | BEM class overrides         |
| Add content around existing components (banners, footers, logos) | 3     | Layout slots (wrap)         |
| Override MDX rendering (custom `<h1>`, `<code>`, etc.)           | 3     | `components` slot           |
| Wrap the app in a provider (state, analytics, auth)              | 4     | Eject `Root`                |
| Replace built-in icons (logo, GitHub, search, etc.)              | —     | Icon re-export              |
| Completely replace a built-in component                          | 4     | Eject that component        |
| Add a global floating component (back-to-top, chat widget)       | —     | `globalUIComponents` config |
| Control page layout structure (hide sidebar, blank page)         | —     | Frontmatter `pageType`      |

---

## theme/index.tsx — The Entry Point

Levels 1A, 3, and 4 all require a `theme/index.tsx` file in the project root (sibling to `docs/`). This is the single entry point for all theme customizations:

```text
project/
├── docs/
├── theme/
│   ├── index.tsx        # Theme entry — re-exports + overrides
│   ├── index.css         # CSS variable / BEM overrides (optional)
│   └── components/       # Ejected components (Level 4)
└── rspress.config.ts
```

Minimal setup:

```tsx
// theme/index.tsx
import './index.css'; // optional
export * from '@rspress/core/theme-original';
```

**Critical import rule**: Inside `theme/` files, always import from `@rspress/core/theme-original`. The path `@rspress/core/theme` resolves to your own `theme/index.tsx`, which causes circular imports. (In `docs/` MDX files, `@rspress/core/theme` is fine — it correctly points to your custom theme.)

---

## Level 1: CSS Variables

Override CSS custom properties for brand colors, backgrounds, text, code blocks, and more.

**Option A** — `theme/index.css` (use when you also have component overrides in `theme/index.tsx`):

```css
/* theme/index.css */
:root {
  --rp-c-brand: #7c3aed;
  --rp-c-brand-light: #8b5cf6;
  --rp-c-brand-dark: #6d28d9;
}
.dark {
  --rp-c-brand: #a78bfa;
}
```

**Option B** — `globalStyles` (use when you only need CSS changes, no component overrides):

```ts
// rspress.config.ts
export default defineConfig({
  globalStyles: path.join(__dirname, 'styles/custom.css'),
});
```

> **Full variable list**: Read `references/css-variables.md` for all available CSS variables with light/dark defaults.

---

## Level 2: BEM Class Overrides

All built-in components follow BEM naming: `.rp-[component]__[element]--[modifier]`.

Common targets: `.rp-nav`, `.rp-link`, `.rp-tabs`, `.rp-codeblock`, `.rp-codeblock__title`, `.rp-nav-menu__item--active`.

Use these in your CSS file for targeted style changes when CSS variables aren't granular enough.

---

## Level 3: Wrap (Layout Slots)

Inject content at specific positions in the layout without replacing built-in components. Override `Layout` in `theme/index.tsx`:

```tsx
// theme/index.tsx
import { Layout as OriginalLayout } from '@rspress/core/theme-original';
export * from '@rspress/core/theme-original';

export function Layout() {
  return (
    <OriginalLayout beforeNavTitle={<MyLogo />} bottom={<CustomFooter />} />
  );
}
```

Use runtime hooks inside slot components — import from `@rspress/core/runtime`: `useDark()`, `useLang()`, `useVersion()`, `usePage()`, `useSite()`, `useFrontmatter()`, `useI18n()`.

> **All slots & examples**: Read `references/layout-slots.md` for the complete slot list and usage patterns including i18n and MDX component overrides.

---

## Level 4: Eject

Copy a built-in component's source for full replacement. Only use when wrap/slots cannot achieve the customization.

```bash
rspress eject           # list available components
rspress eject DocFooter # eject to theme/components/DocFooter/
```

Then re-export in `theme/index.tsx` (named export takes precedence over the wildcard):

```tsx
export * from '@rspress/core/theme-original';
export { DocFooter } from './components/DocFooter';
```

> **Component list & patterns**: Read `references/eject-components.md` for available components, workflow, and common patterns.

---

## Custom Icons

Rspress has 27 built-in icons used across the UI. You can replace any of them by re-exporting your own icon component with the same name — no ejection needed. This uses the same `theme/index.tsx` mechanism: your named export takes precedence over the wildcard re-export.

**Icon type**: Each icon is a React component or a URL string:

```ts
import type { FC, SVGProps } from 'react';
type Icon = FC<SVGProps<SVGSVGElement>> | string;
```

**Example 1** — Replace an icon with a custom SVG component:

```tsx
// theme/index.tsx
export * from '@rspress/core/theme-original';

// Named export overrides the wildcard — replaces the GitHub icon site-wide
export const IconGithub = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 ..." fill="currentColor" />
  </svg>
);
```

**Example 2** — Use an SVGR import:

```tsx
// theme/index.tsx
export * from '@rspress/core/theme-original';

import CustomGithubIcon from './icons/github.svg?react';
export const IconGithub = CustomGithubIcon;
```

**Using `SvgWrapper` in MDX or custom components**:

```mdx
import { SvgWrapper, IconGithub } from '@rspress/core/theme';

<SvgWrapper icon={IconGithub} width={24} height={24} />
```

**Available icons**: `IconArrowDown`, `IconArrowRight`, `IconClose`, `IconCopy`, `IconDeprecated`, `IconDown`, `IconEdit`, `IconEmpty`, `IconExperimental`, `IconExternalLink`, `IconFile`, `IconGithub`, `IconGitlab`, `IconHeader`, `IconJump`, `IconLink`, `IconLoading`, `IconMenu`, `IconMoon`, `IconScrollToTop`, `IconSearch`, `IconSmallMenu`, `IconSuccess`, `IconSun`, `IconTitle`, `IconWrap`, `IconWrapped`.

> **Source**: See the [icons source](https://github.com/web-infra-dev/rspress/blob/main/packages/core/src/theme/icons.ts) for default implementations.

---

## Global UI Components

For components that should render on every page without theme overrides:

```ts
// rspress.config.ts
export default defineConfig({
  globalUIComponents: [
    path.join(__dirname, 'components', 'BackToTop.tsx'),
    [
      path.join(__dirname, 'components', 'Analytics.tsx'),
      { trackingId: '...' },
    ],
  ],
});
```

---

## Page Types

Control layout per page via frontmatter `pageType`:

| Value      | Description                           |
| ---------- | ------------------------------------- |
| `home`     | Home page with navbar                 |
| `doc`      | Standard doc with sidebar and outline |
| `doc-wide` | Doc without sidebar/outline           |
| `custom`   | Custom content with navbar only       |
| `blank`    | Custom content without navbar         |
| `404`      | 404 error page                        |

Fine-grained: set `navbar: false`, `sidebar: false`, `outline: false`, `footer: false` individually.

---

## Common Pitfalls

- **Circular import**: Using `@rspress/core/theme` instead of `@rspress/core/theme-original` in `theme/` files — causes infinite loop.
- **Eject over-use**: Ejecting when a Layout slot or CSS variable would suffice — creates upgrade burden.
- **Missing re-export**: Forgetting `export * from '@rspress/core/theme-original'` in `theme/index.tsx` — breaks all un-overridden components.
- **v1 imports**: Using `rspress/theme` or `@rspress/theme-default` — these are v1 paths. v2 uses `@rspress/core/theme-original`.

## Reference

- Custom theme guide: <https://rspress.rs/guide/basic/custom-theme>
- CSS variables: <https://rspress.rs/ui/vars>
- Layout component: <https://rspress.rs/ui/layout-components/layout>
- Built-in icons: <https://rspress.rs/ui/icons/>
- Built-in hooks: <https://rspress.rs/ui/hooks/>
- CLI commands (eject): <https://rspress.rs/api/commands>
