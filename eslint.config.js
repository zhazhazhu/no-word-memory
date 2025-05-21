import antfu from '@antfu/eslint-config';

export default antfu({
  ignores: ['**/node_modules/**', '**/dist/**', 'pnpm-lock.yaml'],
  vue: true,
  jsonc: true,
  yaml: true,
  typescript: true,
  stylistic: {
    semi: true,
  },
  formatters: {
    css: 'prettier',
  },
  rules: {
    'no-console': 'off',
  },
});
