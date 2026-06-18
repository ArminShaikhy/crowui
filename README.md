# Crow UI

A modern, accessible, and customizable React component library built with TypeScript and Tailwind CSS. This UI Kit is designed to help you rapidly build consistent, scalable user interfaces across your web applications.

## ✨ Features

- 📦 **Reusable React Components** – A growing set of fully styled and typed UI components.
- 🎨 **Customizable Design Tokens** – Easily override colors via CSS variables.
- 🧩 **Tree-shakable** – Import only what you need.
- ⚡ **Tailwind CSS Utility Classes** – Built-in styles with scoped, prefixed Tailwind utilities.
- 📚 **Storybook Documentation** – [Explore live components & usage](https://arminshaikhy.github.io/crowui/).

## 📦 Installation

Before using this library, make sure you have `react` installed in your project, as it's a peer dependency.

```bash
npm install crow-ui
```

or

```bash
yarn add crow-ui
```

> No need to set up Tailwind or any additional configuration. All styles are already bundled and scoped.

## 🚀 Getting Started

Visit the [documentation site](https://arminshaikhy.github.io/crowui/) to learn more about:

- How to use the components
- Customizing theme tokens like colors
- Contributing to the project

## 🧱 Project Structure

Each component lives in its own folder under the `src/components` directory.

- Every component must export from an `index.ts` or `index.tsx` file. Vite uses this to build each component individually.
- If a component exports multiple members (e.g., `Button`, `ButtonGroup`), use named exports in its `index` file.
- Each component must have a `ComponentName.stories.tsx` file to generate its documentation.

The root `index.ts` file serves as the main entry point for bundling the entire library and contains exports for all components.

## 🛠️ Contributing

We welcome contributions! See the [Contributing Guide](https://arminshaikhy.github.io/crowui/?path=/docs/getting-started-contributing--documentation) to learn how to get started.

## 📄 License

This project is licensed under the MIT License.
