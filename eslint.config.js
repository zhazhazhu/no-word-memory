import antfu from '@antfu/eslint-config';

export default antfu({
  ignores: ['**/node_modules/**', '**/dist/**', 'pnpm-lock.yaml'],
  jsonc: true,
  yaml: true,
  typescript: true,
  stylistic: {
    semi: true,
  },
});
