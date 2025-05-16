import antfu from '@antfu/eslint-config';

export default antfu({
  vue: true,
  jsonc: false,
  yaml: true,
  unocss: true,
  typescript: true,
  stylistic: {
    semi: true,
  },
  formatters: {
    css: 'prettier',
  },
});
