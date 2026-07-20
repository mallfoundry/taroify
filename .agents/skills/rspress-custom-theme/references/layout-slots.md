# Layout Slots Reference

The `Layout` component accepts slot props (`React.ReactNode`) for injecting content at specific positions without replacing built-in components. This is the recommended way to extend Rspress before considering eject.

Official reference: <https://rspress.rs/ui/layout-components/layout>

---

## All Available Slots

### Navigation Bar

| Slot             | Position                             |
| ---------------- | ------------------------------------ |
| `beforeNav`      | Before the entire navigation bar     |
| `afterNav`       | After the entire navigation bar      |
| `beforeNavTitle` | Before the nav title/logo (top-left) |
| `navTitle`       | Replaces the nav title content       |
| `afterNavTitle`  | After the nav title/logo             |
| `beforeNavMenu`  | Before the nav menu items            |
| `afterNavMenu`   | After the nav menu items             |

### Sidebar & Outline

| Slot            | Position                            |
| --------------- | ----------------------------------- |
| `beforeSidebar` | Above the left sidebar              |
| `afterSidebar`  | Below the left sidebar              |
| `beforeOutline` | Above the right outline (TOC) panel |
| `afterOutline`  | Below the right outline panel       |

### Home Page

| Slot             | Position                 |
| ---------------- | ------------------------ |
| `beforeHero`     | Before the Hero section  |
| `afterHero`      | After the Hero section   |
| `beforeFeatures` | Before the Features grid |
| `afterFeatures`  | After the Features grid  |

### Doc Page

| Slot               | Position                              |
| ------------------ | ------------------------------------- |
| `beforeDoc`        | At the very beginning of the doc page |
| `afterDoc`         | At the very end of the doc page       |
| `beforeDocContent` | Before the document content area      |
| `afterDocContent`  | After the document content area       |
| `beforeDocFooter`  | Before the doc footer (prev/next nav) |
| `afterDocFooter`   | After the doc footer                  |

### Global

| Slot         | Position                                                               |
| ------------ | ---------------------------------------------------------------------- |
| `top`        | At the very top of the entire page                                     |
| `bottom`     | At the very bottom of the entire page                                  |
| `components` | Custom MDX component overrides (`Record<string, React.ComponentType>`) |

---

## Usage Pattern

All examples below follow the same structure in `theme/index.tsx`. The key parts:

- Import `Layout` from `@rspress/core/theme-original` (not `@rspress/core/theme` — that causes circular imports)
- Re-export everything: `export * from '@rspress/core/theme-original'`
- Export your custom `Layout` that wraps the original with slot props

### Basic — Single Slot

```tsx
// theme/index.tsx
import { Layout as OriginalLayout } from '@rspress/core/theme-original';
export * from '@rspress/core/theme-original';

export function Layout() {
  return <OriginalLayout beforeNavTitle={<MyLogo />} />;
}
```

### Multiple Slots

```tsx
// theme/index.tsx
import { Layout as OriginalLayout } from '@rspress/core/theme-original';
export * from '@rspress/core/theme-original';

export function Layout() {
  return (
    <OriginalLayout
      top={<div className="announcement-bar">New version released!</div>}
      bottom={<footer>© 2025 My Company</footer>}
      afterOutline={<div>Related resources</div>}
    />
  );
}
```

### With i18n Hooks

```tsx
// theme/index.tsx
import { Layout as OriginalLayout } from '@rspress/core/theme-original';
import { useLang } from '@rspress/core/runtime';
export * from '@rspress/core/theme-original';

function LocalizedBanner() {
  const lang = useLang();
  return <div>{lang === 'zh' ? '欢迎' : 'Welcome'}</div>;
}

export function Layout() {
  return <OriginalLayout top={<LocalizedBanner />} />;
}
```

### Override MDX Components

The `components` slot accepts a `Record<string, React.ComponentType>` to override how MDX elements render:

```tsx
// theme/index.tsx
import { Layout as OriginalLayout } from '@rspress/core/theme-original';
export * from '@rspress/core/theme-original';

function CustomH1({ children }: { children: React.ReactNode }) {
  return (
    <h1 style={{ borderBottom: '2px solid var(--rp-c-brand)' }}>{children}</h1>
  );
}

export function Layout() {
  return <OriginalLayout components={{ h1: CustomH1 }} />;
}
```

---

## Available Hooks

Use these hooks inside slot components. Import from `@rspress/core/runtime`.

| Hook               | Purpose                             |
| ------------------ | ----------------------------------- |
| `useDark()`        | Returns whether dark mode is active |
| `useLang()`        | Returns current language code       |
| `useVersion()`     | Returns current doc version         |
| `usePage()`        | Returns current page metadata       |
| `usePages()`       | Returns all pages metadata          |
| `useSite()`        | Returns site-level configuration    |
| `useFrontmatter()` | Returns current page frontmatter    |
| `useI18n()`        | Returns i18n translation function   |
