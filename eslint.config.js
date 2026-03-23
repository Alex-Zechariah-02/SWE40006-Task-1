const tsParser = require('@typescript-eslint/parser')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const reactPlugin = require('eslint-plugin-react')
const reactHooksPlugin = require('eslint-plugin-react-hooks')
const unusedImportsPlugin = require('eslint-plugin-unused-imports')
const globals = require('globals')

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  {
    ignores: [
      'node_modules/**',
      'out/**',
      'release/**',
      'dist/**',
      'build/**',
      '**/*.min.*',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,

      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      'react/react-in-jsx-scope': 'off',
    },
  },
]
