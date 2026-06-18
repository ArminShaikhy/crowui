# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Crow UI — a React + TypeScript component library styled with Tailwind CSS v4 (scoped under a `crow` prefix), built with Vite, documented with Storybook. Published to npm as `crow-ui`; consumers import either the whole package or per-component subpaths (e.g. `crow-ui/Button`).

## Commands

- `yarn dev` — run Storybook locally (port 6006) for visual dev/testing of components.
- `yarn build` — full library build: wipes `dist`, runs `tsc` (type-check only, no emit), `vite build` (per-component bundles), then `node scripts/generate-exports.js` to regenerate `package.json#exports`.
- `yarn build:story` — build static Storybook site to `./docs` (this is what's published to GitHub Pages).
- `yarn lint` — ESLint over `src/**/*` with `--max-warnings 0`; fixes what it can.
- `yarn format` — Prettier write over `src/**/*`.
- `yarn transform-icons` — regenerates `src/icons/` from `assets/icons/` via SVGR; run after adding/changing SVGs in `assets/icons`.

There is no test runner configured (no `test` script, no Jest/Vitest). Validation is via `tsc`, ESLint, and Storybook visual review. `eslint-plugin-jest-dom` is present but unused for now — don't assume a test suite exists.

Pre-commit (husky + lint-staged) runs `yarn lint` + `yarn format` on staged `.js/.jsx/.ts/.tsx` files; commit-msg runs commitlint against Conventional Commits (types defined in `conventionalCommit.json`, scope must be camelCase or PascalCase).

## Architecture

### Component anatomy
Every component lives in its own folder under `src/components/<Name>/`:
- `index.tsx` — the component, default-exported (named exports too if it has sub-parts, e.g. `AccordionGroup`/`AccordionItem`).
- `<Name>.stories.tsx` — required; this is also the component's documentation page in Storybook (`title: 'Components/<Name>'`). Story `argTypes`/descriptions double as the public API docs.
- Optional `types.ts`, `constants.ts`, `variants.ts` for that component's own concerns.

`src/components/index.ts` is the single source of truth for the public API — every exported component/type must be re-exported there (named exports, plus `export type` for prop types). This file is what `src/index.ts`-equivalent bundling and `generate-exports.js` walk to build per-component `package.json#exports` entries.

### Build/export pipeline (don't fight this)
`vite.config.ts` auto-discovers every `src/components/<Name>/index.tsx` (recursively, so nested dirs like `Form/Checkbox` work too) and builds each as its own Vite lib entry — this is what makes `crow-ui/Button` importable standalone. After building, `scripts/generate-exports.js` walks `dist` and rewrites `package.json#exports` to match, including wildcard `null` entries for "private" subpaths (currently `Form/Wrappers/*` and `Form/Common/*`) that shouldn't be imported directly by consumers. If you add a component, you generally don't need to touch `vite.config.ts` or `package.json` exports by hand — just add the folder with an `index.tsx` and run `yarn build`.

### Form components
`src/components/Form/` groups all form controls (Checkbox, Select, Datepicker, OtpInput, RadioButton, RangeInput, Switch, Textarea, Timepicker, Input). Shared, non-public-API logic lives in `Form/Wrappers/` (e.g. `PickerWrapper` — shared dropdown/drawer/popover positioning logic used by Datepicker/Timepicker/Select, `RadioCheckboxWrapper`) and `Form/Common/`. These are deliberately excluded from the public exports map (see above) — treat them as internal-only, import via relative paths within `src/`, not via the package's public subpaths.

### Theming
- `src/styles.css` is the entry stylesheet: imports Tailwind with `prefix(crow)` (all Tailwind utility classes used/generated in this repo are `crow:`-prefixed to avoid clashing with consumer apps), then `theme/index.css`, then defines the `dark` custom variant (`@custom-variant dark (&:where(.dark, .dark *))`).
- `theme/tokens.css` defines all design tokens as CSS custom properties (`--crow-color-*`, etc., stored as space-separated RGB triples for use with Tailwind's `rgb(var(--x) / <alpha>)` pattern). `theme/base.css` holds base-layer resets and the `font-display-*`/`font-body-*` utility classes. `theme/dark.css` overrides tokens under `.dark`.
- Dark mode is just a `.dark` class on an ancestor element — no JS required to use it. `components/ThemeProvider` is optional sugar on top: it manages `mode` (`light`/`dark`/`system`) with persistence (`localStorage`) and toggles the `.dark` class for you via a `useTheme()` hook, plus a `data-brand` attribute for multi-brand token overrides. Don't assume ThemeProvider is required — components must work correctly with just a `.dark` class present, with or without it.
- Each component file that needs styles imports `'@/src/styles.css'` directly (side-effect import, declared in `package.json#sideEffects`) rather than relying on a global stylesheet import — keep this pattern for new components so per-component bundles stay self-contained.

### Path alias
`@/src/*` maps to `./src/*` (configured in both `tsconfig.json` and `vite.config.ts`). Use it for cross-directory imports (e.g. `@/src/hooks/useOutsideClick`); use relative imports within the same component folder.

### Icons
`src/icons/` is generated output (via `svgr`, see `svgr.config.cjs`/`svgr-template.cjs`) from SVGs in `assets/icons/`. Never hand-edit files in `src/icons/` — edit/add the source SVG and re-run `yarn transform-icons`.

### Docs (`src/documents/`)
MDX files under `documents/introductions`, `documents/contributing`, `documents/colors` are loaded by Storybook (see `stories` glob in `.storybook/main.ts`) as standalone documentation pages, separate from per-component `.stories.tsx` docs.
