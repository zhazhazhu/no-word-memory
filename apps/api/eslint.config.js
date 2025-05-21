import antfu from '@antfu/eslint-config'
import config from '../../eslint.config.js'

export default antfu({
  ...config,
  rules: {
    'no-console': 'off',
  },
})
