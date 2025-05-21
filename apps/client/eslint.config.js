import antfu from '@antfu/eslint-config';
import config from '../../eslint.config.js';

export default antfu({
  ...config,
  vue: true,
  unocss: true,
  formatters: {
    css: 'prettier',
  },
});
