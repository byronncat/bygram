import webpackConfig from './webpack.config'
import jestConfig from './jest.config'
import eslintConfig from './eslint.config'

module.exports = {
  webpack: webpackConfig,
  jest: {
    configure: jestConfig,
  },
  eslint: {
    configure: eslintConfig,
  },
}
