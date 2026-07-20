# CSS Variables Reference

Complete list of CSS variables exposed by Rspress for theme customization.

- **Override location**: `theme/index.css` or `globalStyles` in `rspress.config.ts`
- **Dark mode selector**: `.dark { ... }`
- **Official docs**: <https://rspress.rs/ui/vars>

---

## Brand Colors (shared)

```css
:root {
  --rp-c-brand: #0095ff;
  --rp-c-brand-light: #33adff;
  --rp-c-brand-lighter: #c6e0fd;
  --rp-c-brand-dark: #0077ff;
  --rp-c-brand-darker: #005fcc;
  --rp-c-brand-tint: rgba(127, 163, 255, 0.16);
}
```

## Base Variables

| Variable               | Light                 | Dark                     |
| ---------------------- | --------------------- | ------------------------ |
| `--rp-c-bg`            | `#ffffff`             | `#121212`                |
| `--rp-c-bg-soft`       | `#f8f8f9`             | `#292e37`                |
| `--rp-c-bg-mute`       | `#f1f1f1`             | `#343a46`                |
| `--rp-c-bg-alt`        | `#fff`                | `#000`                   |
| `--rp-c-divider`       | `rgba(0, 0, 0, 0.25)` | `rgba(84, 84, 84, 0.65)` |
| `--rp-c-divider-light` | `rgba(0, 0, 0, 0.12)` | `rgba(84, 84, 84, 0.48)` |

## Text Colors

| Variable        | Light                    | Dark                        |
| --------------- | ------------------------ | --------------------------- |
| `--rp-c-text-0` | `#000000`                | `#ffffff`                   |
| `--rp-c-text-1` | `#242424`                | `rgba(255, 255, 245, 0.93)` |
| `--rp-c-text-2` | `rgba(0, 0, 0, 0.7)`     | `rgba(255, 255, 245, 0.65)` |
| `--rp-c-text-3` | `rgba(60, 60, 60, 0.33)` | `rgba(235, 235, 235, 0.38)` |
| `--rp-c-text-4` | `rgba(60, 60, 60, 0.18)` | `rgba(235, 235, 235, 0.18)` |
| `--rp-c-link`   | `var(--rp-c-brand-dark)` | `var(--rp-c-brand-light)`   |

## Inline Code

| Variable                  | Light                       | Dark                        |
| ------------------------- | --------------------------- | --------------------------- |
| `--rp-c-text-code`        | `#476582`                   | `#c9def1`                   |
| `--rp-c-text-code-bg`     | `rgba(153, 161, 179, 0.06)` | `rgba(255, 255, 255, 0.06)` |
| `--rp-c-text-code-border` | `rgba(0, 0, 0, 0.035)`      | `rgba(255, 255, 255, 0.04)` |

## Code Blocks

| Variable                 | Light                                 | Dark                                  |
| ------------------------ | ------------------------------------- | ------------------------------------- |
| `--rp-code-font-size`    | `0.875rem`                            | `0.875rem`                            |
| `--rp-code-title-bg`     | `#f8f8f9`                             | `#191919`                             |
| `--rp-code-block-color`  | `rgb(46, 52, 64)`                     | `rgb(229, 231, 235)`                  |
| `--rp-code-block-bg`     | `var(--rp-c-bg)`                      | `var(--rp-c-bg)`                      |
| `--rp-code-block-border` | `1px solid var(--rp-c-divider-light)` | `1px solid var(--rp-c-divider-light)` |
| `--rp-code-block-shadow` | `none`                                | `none`                                |

## Shiki Syntax Highlighting

Rspress uses `.dark` on `html` as the public dark-mode toggle for general theme overrides. The Shiki token blocks below target `html:not(.rp-dark)` and `html.rp-dark`, which Rspress uses internally for syntax highlighting variables.

### Light

```css
html:not(.rp-dark) {
  --shiki-foreground: inherit;
  --shiki-background: transparent;
  --shiki-token-constant: #1976d2;
  --shiki-token-string: #31a94d;
  --shiki-token-comment: rgb(182, 180, 180);
  --shiki-token-keyword: #cf2727;
  --shiki-token-parameter: #f59403;
  --shiki-token-function: #7041c8;
  --shiki-token-string-expression: #218438;
  --shiki-token-punctuation: #242323;
  --shiki-token-link: #22863a;
  --shiki-token-deleted: #d32828;
  --shiki-token-inserted: #22863a;
}
```

### Dark

```css
html.rp-dark {
  --shiki-foreground: inherit;
  --shiki-background: transparent;
  --shiki-token-constant: #6fb0fa;
  --shiki-token-string: #f9a86e;
  --shiki-token-comment: #6a727b;
  --shiki-token-keyword: #f47481;
  --shiki-token-parameter: #ff9800;
  --shiki-token-function: #ae8eeb;
  --shiki-token-string-expression: #4fb74d;
  --shiki-token-punctuation: #bbbbbb;
  --shiki-token-link: #f9a76d;
  --shiki-token-deleted: #ee6d7a;
  --shiki-token-inserted: #36c47f;
}
```

## Grays (shared)

```css
:root {
  --rp-c-gray: #8e8e8e;
  --rp-c-gray-light-1: #aeaeae;
  --rp-c-gray-light-2: #c7c7c7;
  --rp-c-gray-light-3: #d1d1d1;
  --rp-c-gray-light-4: #e5e5e5;
  --rp-c-gray-light-5: #f2f2f2;
}
```

## Shadows (shared)

```css
:root {
  --rp-shadow-1: 0 1px 2px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.06);
  --rp-shadow-2: 0 3px 12px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.07);
  --rp-shadow-3: 0 12px 32px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.08);
  --rp-shadow-4: 0 14px 44px rgba(0, 0, 0, 0.12), 0 3px 9px rgba(0, 0, 0, 0.12);
  --rp-shadow-5:
    0 18px 56px rgba(0, 0, 0, 0.16), 0 4px 12px rgba(0, 0, 0, 0.16);
}
```

## Radius (shared)

```css
:root {
  --rp-radius: 1rem;
  --rp-radius-small: 0.5rem;
  --rp-radius-large: 1.5rem;
}
```

## Home Page

Note: `...` in gradient values marks omitted gradient parameters, not literal CSS. See the official docs link above for complete values.

| Variable                         | Light                                                                                                                     | Dark                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `--rp-home-hero-secondary-color` | `#a673ff`                                                                                                                 | `#a673ff`                                                                   |
| `--rp-home-hero-title-color`     | `transparent`                                                                                                             | `transparent`                                                               |
| `--rp-home-hero-title-bg`        | `linear-gradient(90deg, var(--rp-c-brand-dark) 0%, var(--rp-c-brand-dark) 30%, var(--rp-home-hero-secondary-color) 100%)` | (same)                                                                      |
| `--rp-home-background-bg`        | `radial-gradient(...), radial-gradient(...), radial-gradient(...), #fff`                                                  | `radial-gradient(...), radial-gradient(...), radial-gradient(...), #121212` |
| `--rp-home-feature-bg`           | `linear-gradient(135deg, #fff, #f9f9f980)`                                                                                | `linear-gradient(135deg, #ffffff00, #ffffff08)`                             |

## Quick Start

```css
/* Example brand color overrides for the custom theme scaffold. */
/* For more CSS variables, see https://rspress.rs/ui/vars. */
:root {
  --rp-c-brand: #ff5e00;
  --rp-c-brand-dark: #ff704d;
  --rp-c-brand-darker: #ff704d;
  --rp-c-brand-light: #ff7524;
  --rp-c-brand-lighter: #ff7524;
  --rp-c-brand-tint: rgba(255, 94, 0, 0.07);

  --rp-home-hero-secondary-color: #ff5e00;
}

.dark {
  --rp-c-brand: #ff8c4d;
  --rp-home-hero-secondary-color: #ff8c4d;
}
```
