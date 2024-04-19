import webpackConfig from './webpack.config'
import jestConfig from './jest.config'

module.exports = {
  webpack: webpackConfig,
  jest: {
    configure: jestConfig,
  },
}
