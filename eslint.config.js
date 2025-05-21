import antfu from '@antfu/eslint-config';

export default antfu({
  jsonc: true,
  yaml: true,
  typescript: true,
  stylistic: {
    semi: true,
  },
});
