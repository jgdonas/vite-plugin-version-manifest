import js from '@eslint/js';
import tseslint from 'typescript-eslint'; // The main package
import globals from 'globals';

export default [
  // Start with the recommended rules for...
  js.configs.recommended,          // 1. Plain JavaScript
  ...tseslint.configs.recommended, // 2. TypeScript

  // Global ignores
  {
    ignores: ['node_modules/', 'dist/'],
  },

  // Main config for our project's TypeScript files
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node, // Enables all Node.js globals (like `process`)
      },
    },
    rules: {
      // We know we're using 'any' for globalThis, so let's turn this off
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];