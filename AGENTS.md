# AGENTS.md — crow-ui

Reference for AI coding agents integrating `crow-ui` into a consumer project (not for agents working on the crow-ui repo itself — see `CLAUDE.md` for that).

## What this is

`crow-ui` is a React + TypeScript component library styled with Tailwind CSS (scoped under a `crow:` prefix, so it never collides with your app's own Tailwind classes). Each component ships as its own bundle, importable from a per-component subpath.

```bash
npm install crow-ui
# or
yarn add crow-ui
```

Peer dependencies: `react >=18.2.0`, `react-dom >=18.2.0`. Install those yourself if not already present.

## Setup

No Tailwind config, no separate CSS import, no extra build step. Each component's bundle pulls in its own scoped CSS as a side effect — just import the component:

```tsx
import Button from 'crow-ui/Button';

<Button variant="primary">Click</Button>;
```

This works out of the box with Vite, webpack, Next.js, and CRA (any bundler that handles CSS-from-JS imports, which all of these do by default). There is no `crow-ui/dist/index.css` to import manually.

**Dark mode**: add a `.dark` class to any ancestor element (e.g. `<html class="dark">`). No JS required — every component reacts to it via CSS.

```tsx
<ThemeProvider defaultMode="system">
  <App />
</ThemeProvider>
```

`ThemeProvider` (`crow-ui/ThemeProvider`) is optional sugar over the same `.dark`-class mechanism: it adds system-preference detection, `localStorage` persistence, and a `useTheme()` hook.

```ts
const { mode, setMode } = useTheme();
// mode: 'light' | 'dark' | 'system' (or resolved value depending on usage)
setMode('dark');
```

`ThemeProvider` props: `mode` (controlled), `defaultMode` (`'light' | 'dark' | 'system'`, default `'system'`), `onModeChange`, `brand` (sets `data-brand` attr for multi-brand token overrides), `storageKey` (default `'crow-theme-mode'`), `attachTo` (ref to target element, defaults to `document.documentElement`).

Caveat: to avoid a flash of the wrong theme on first paint, set the `.dark` class yourself (read from your own persisted storage) via an inline `<head>` script before React hydrates — `ThemeProvider` can't run early enough to prevent that flash on its own.

## Import patterns

Either the whole package, or per-component subpaths (preferred — keeps your bundle smaller):

```tsx
import { Button, Modal } from 'crow-ui';
// or
import Button from 'crow-ui/Button';
import Modal from 'crow-ui/Modal';
```

Subpath import maps 1:1 to the component's folder, including nested ones:

```tsx
import Checkbox from 'crow-ui/Form/Checkbox';
import ProgressBar from 'crow-ui/Progress/Bar';
import { HorizontalStepper, HorizontalStep } from 'crow-ui/Stepper/Horizontal';
```

**Do not import** `crow-ui/Form/Wrappers/*` or `crow-ui/Form/Common/*` — these are internal-only and blocked in the package's exports map.

Only components re-exported from the package root are public/stable. `Carousel`, `Collapse`, `List`, `SegmentedControl`, `Tree` exist in the repo but are not part of the published API — don't use them.

## Theming reference

Design tokens are CSS custom properties storing RGB triples, overridable in `:root` to rebrand without touching any component code:

```css
:root {
  --crow-color-primary-500: 40 82 228; /* R G B */
}
```

Pattern: `--crow-color-{semantic}-{shade}` where semantic is `primary`, `secondary`, `success`, `warning`, `error`, `gray`, `sky`, `violet`, `flamingo`, and shade runs `50`–`900`. Dark-mode overrides for the same variables live under `.dark` automatically — no consumer action needed unless you want to customize dark values too (override the same vars inside a `.dark { ... }` block in your own CSS).

## Hooks (exported from package root)

| Hook | Returns | Notes |
|---|---|---|
| `useTheme()` | `{ mode, setMode, brand, setBrand }` | Only works inside a `<ThemeProvider>`. |
| `useToast()` | `{ toasts, add, remove, clear }` | Only works inside a `<ToastProvider>`. `add({ message, variant?, duration?, position? })` returns a toast id. |
| `useDebouncedCallback` | debounced function | General utility, no provider needed. |
| `usePopover` | `{ isOpen, toggle, close, ... }` | General utility, no provider needed. |

## Component reference

Minimal usage per component. For full prop tables and live examples, see the [Storybook docs site](https://arminshaikhy.github.io/crowui/).

### Layout

| Component | Import | Key props | Example |
|---|---|---|---|
| Card | `crow-ui/Card` | `header` ({title, icon, color, variant}), `color`, `size`, `shadow` | `<Card header={{ title: 'Title' }}>Content</Card>` |
| Divider | `crow-ui/Divider` | `type` (`'horizontal'\|'vertical'`), `size` (`'thin'\|'thick'`), `color`, `style` (`'solid'\|'dashed'\|'dotted'`) | `<Divider type="horizontal" />` |
| Sidebar | `crow-ui/Sidebar` | `isOpen`, `setIsOpen`, `items` (`FirstLevelSidebarItem[]`), `variant` (`'filled'\|'bordered'\|'ghost'`), `position` (`'left'\|'right'`) | `<Sidebar isOpen={open} setIsOpen={setOpen} items={items} />` |
| Breadcrumb | `crow-ui/Breadcrumb` | `pageTitle`, `items` (`BreadcrumbItem[]`: `title`, `link`/`onClick`, `icon`) | `<Breadcrumb pageTitle="Page" items={[{ title: 'Home', link: '/' }]} />` |

### Navigation & disclosure

| Component | Import | Key props | Example |
|---|---|---|---|
| Accordion | `crow-ui/Accordion` (`AccordionGroup`, `AccordionItem`) | `AccordionGroup` takes `disableAccordion`; `AccordionItem` takes `title` | `<AccordionGroup><AccordionItem title="Title">Content</AccordionItem></AccordionGroup>` |
| Menu | `crow-ui/Menu` | `trigger` (render prop: `(toggle, ref, isOpen) => node`), `position`, `panelVariant` (`'default'\|'minimal'`). Items via static `Menu.Item` | `<Menu trigger={(toggle, ref) => <button ref={ref} onClick={toggle}>Menu</button>}><Menu.Item onClick={fn}>Item</Menu.Item></Menu>` |
| Tabs | `crow-ui/Tabs` | `items` (`{key, title, icon?, badgeNumber?, disabled?}[]`), `activeKey`, `onChange`, `variant` (`'underline'\|'pills'\|'card'`), `orientation`, `fullWidth` | `<Tabs activeKey={key} onChange={setKey} items={items} />` |
| Stepper | `crow-ui/Stepper/Horizontal` (`HorizontalStepper`, `HorizontalStep`) | `activeStep`, `size` (`'small'\|'medium'`) | `<HorizontalStepper activeStep={1}><HorizontalStep title="Step 1" /></HorizontalStepper>` |
| Pagination | `crow-ui/Pagination` | `totalCount`, `pageSize`, `defaultCurrent`, `siblingCount` | `<Pagination totalCount={100} pageSize={8} />` |

### Feedback & display

| Component | Import | Key props | Example |
|---|---|---|---|
| Alert | `crow-ui/Alert` | `title`, `text`, `variant` (`'warning'\|'primary'\|'error'\|'success'\|'gray'`), `closable` | `<Alert title="Title" text="Message" variant="primary" closable />` |
| Badge | `crow-ui/Badge` | `value`, `valueType` (`'text'\|'number'`), `type` (`'twoTone'\|'solid'`), `color`, `size` | `<Badge value="Text" valueType="text" type="solid" color="primary" />` |
| Chip | `crow-ui/Chip` | `label`, `size` (`'xsmall'\|'small'\|'medium'\|'large'`), `color`, `clickable` | `<Chip label="Badge" size="small" color="primary" />` |
| ProgressBar | `crow-ui/Progress/Bar` | `current`, `total`, `title`, `color`, `size` (`'thin'\|'medium'\|'thick'`), `striped`, `animated` | `<ProgressBar current={50} total={100} color="primary" />` |
| ProgressDoughnut | `crow-ui/Progress/Doughnut` | `current`, `total`, `color`, `showText` | `<ProgressDoughnut current={1} total={5} />` |
| Rate | `crow-ui/Rate` | `value`, `total`, `size` (`'large'\|'small'`), `onChange` | `<Rate value={3} total={5} onChange={fn} />` |
| Skeleton | `crow-ui/Skeleton` (`Skeleton`, `SkeletonText`, `SkeletonAvatar`, `SkeletonCard`) | `variant` (`'block'\|'line'`), `width`, `height` | `<Skeleton variant="block" width={240} height={120} />` |
| Toast | `crow-ui/Toast` (`ToastProvider`, `useToast`) | Provider: `defaultPosition`, `defaultDuration`. Hook: `add({ message, variant? })` | `<ToastProvider><App /></ToastProvider>` then `useToast().add({ message: 'Saved' })` |
| Tooltip | `crow-ui/Tooltip` | `title`, `content`, `position`, `size`, `theme` (`'dark'\|'light'`), `children` (hover/trigger target) | `<Tooltip content="Help text"><span>Hover</span></Tooltip>` |

### Modal & Drawer

| Component | Import | Key props | Example |
|---|---|---|---|
| Drawer | `crow-ui/Drawer` | `open`, `onClose`, `header` ({title, description, haveCloseIcon, actionElement}), `footer`, `position` (`'bottom'\|'top'\|'right'\|'left'\|'center'`), `width`, `padding`, `persist` | `<Drawer open={open} onClose={fn} header={{ title: 'Title' }}>Content</Drawer>` |
| Modal | `crow-ui/Modal` | Same base as Drawer (minus `position`/`header`) plus `title`, `description`, `onConfirm`, `onCancel`, `confirmLabel`, `cancelLabel`, `confirmLoading` | `<Modal open={open} onClose={fn} title="Title" onConfirm={fn}>Content</Modal>` |

> **Note**: `Modal`'s default `confirmLabel`/`cancelLabel` are Persian (`'تایید'`/`'انصراف'`) — always pass your own `confirmLabel`/`cancelLabel` for non-Persian UIs.

### Form controls (`crow-ui/Form/*`)

All share a common pattern: `value`, `onChange`, plus error/label props (`isError`, `errorMessage`, `labelContent`, `hintMessage`) where applicable.

| Component | Import | Key props | Example |
|---|---|---|---|
| Input | `crow-ui/Form/Input` | `value`, `onChange`, `labelContent`, `isError`, `errorMessage`, `maxLength` | `<Input value={v} onChange={fn} labelContent="Name" />` |
| Textarea | `crow-ui/Form/Textarea` | same shape as Input | `<Textarea value={v} onChange={fn} labelContent="Notes" />` |
| Checkbox | `crow-ui/Form/Checkbox` | `checked`, `onChange`, `label`, `variant` (`'bordered'\|'default'`) | `<Checkbox checked={v} onChange={fn} label="Option" />` |
| RadioButton | `crow-ui/Form/RadioButton` | same shape as Checkbox | `<RadioButton checked={v} onChange={fn} label="Option" />` |
| Switch | `crow-ui/Form/Switch` | `checked`, `onChange`, `size`, `label`, `description` | `<Switch checked={v} onChange={fn} label="Toggle" />` |
| Select | `crow-ui/Form/Select` | `value`, `onChange`, `options` (`{value, label, disabled?}[]`), `mode` (`'single'\|'multiple'` — value/onChange shape changes accordingly), `searchable` | `<Select value={v} onChange={fn} options={opts} />` |
| Datepicker | `crow-ui/Form/Datepicker` | `value` (`Date \| null`, or `{start, end}` when `acceptRange`), `onChange`, `mode` (`'input'\|'calendar'`), `acceptRange`, `disableDates`, `holidays` | `<Datepicker value={date} onChange={fn} />` |
| Timepicker | `crow-ui/Form/Timepicker` | `value`, `onChange`, `acceptRange`, `mode` (`'input'\|'time'`), `minuteStep` | `<Timepicker value={time} onChange={fn} />` |
| OtpInput | `crow-ui/Form/OtpInput` | `value`, `onChange`, `onEnd`, `inputsNumber` | `<OtpInput value={v} onChange={fn} inputsNumber={4} />` |
| RangeInput | `crow-ui/Form/RangeInput` | `value`, `onChange`, `min`, `max`, `step`, `color` | `<RangeInput value={50} onChange={fn} min={0} max={100} />` |
| FileUploader | `crow-ui/Form/FileUploader` | `files`, `onChange`, `mode` (`'single'\|'multiple'`) | `<FileUploader files={file} onChange={fn} mode="single" />` |

### Data display

| Component | Import | Key props | Example |
|---|---|---|---|
| Table | `crow-ui/Table` | `data`, `columns` (`ColumnsType[]`: `key`/`dataIndex`, `title`, `render?`, `sort?`), `rowKey`, `pagination`, `rowSelection`, `loading` | `<Table data={rows} columns={cols} rowKey="id" />` |
| Slider | `crow-ui/Slider` (`Slider`, `Slide`) | `slidesPerView`, `spaceBetween`, `autoplay`, `showNavigationDots` | `<Slider slidesPerView={1}><Slide>Content</Slide></Slider>` |

### Button

| Component | Import | Key props | Example |
|---|---|---|---|
| Button | `crow-ui/Button` | `variant` (`'primary'\|'secondary'\|'outline'\|'text'\|'ghost'\|'link'`), `color`, `size` (`'small'\|'medium'\|'large'\|'xlarge'`), `leftIcon`, `rightIcon`, `disabled`, `as` (polymorphic) | `<Button variant="primary" size="medium">Click</Button>` |

## Links

- Storybook docs (full prop tables, live examples): https://arminshaikhy.github.io/crowui/
- Repo: https://github.com/ArminShaikhy/crowui
