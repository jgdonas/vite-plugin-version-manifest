# Vite Plugin Version Manifest

[![NPM Version](https://img.shields.io/npm/v/vite-plugin-version-manifest.svg)](https://www.npmjs.com/package/vite-plugin-version-manifest)
[![License](https://img.shields.io/npm/l/vite-plugin-version-manifest.svg)](./LICENSE)
[![Downloads](https://img.shields.io/npm/dt/vite-plugin-version-manifest.svg)](https://www.npmjs.com/package/vite-plugin-version-manifest)

A simple Vite plugin that generates a version manifest file with build and version control information.

## ✨ Features

- Generates a JSON manifest with useful build-time information.
- Includes project version from `package.json`.
- Includes Git commit hash and branch name.
- Includes build timestamp and duration.
- Zero dependencies.

## 📦 Installation

```bash
npm install vite-plugin-version-manifest --save-dev
# or
yarn add vite-plugin-version-manifest --dev
# or
pnpm add vite-plugin-version-manifest --save-dev
```

## 🚀 Usage

Add the plugin to your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import versionManifest from 'vite-plugin-version-manifest';

export default defineConfig({
  plugins: [
    versionManifest(),
  ],
});
```

This will generate a `version-manifest.json` file in your build output directory.

## ⚙️ Configuration

You can pass options to the plugin:

```typescript
import { defineConfig } from 'vite';
import versionManifest from 'vite-plugin-version-manifest';

export default defineConfig({
  plugins: [
    versionManifest({
      // Set to true to log manifest generation details to the console.
      verbose: true,
      // Customize the output file name.
      outFileName: 'my-version-info.json',
    }),
  ],
});
```

| Option        | Type      | Default                   | Description                               |
|---------------|-----------|---------------------------|-------------------------------------------|
| `verbose`     | `boolean` | `false`                   | Show logs during manifest generation.     |
| `outFileName` | `string`  | `'version-manifest.json'` | Name of the generated manifest file.      |

## 📄 Example Output

The generated `version-manifest.json` will look like this:

```json
{
  "environment": "production",
  "version": "1.0.0",
  "gitInfo": {
    "commitHash": "a1b2c3d",
    "branch": "main"
  },
  "build": {
    "time": "2025-10-26T10:00:00.000Z",
    "duration": 1234
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please see the [Contributing Guidelines](./CONTRIBUTING.md) for more details.

## 📝 License

This project is licensed under the ISC License. See the [LICENSE](./LICENSE) file for details.
