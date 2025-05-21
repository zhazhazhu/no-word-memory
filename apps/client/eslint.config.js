import antfu from '@antfu/eslint-config';
import config from '../../eslint.config';

export default antfu({
  ...config,
  vue: true,
  unocss: true,
  formatters: {
    css: 'prettier',
  },
});
