import path from 'path'

module.exports = {
  webpack: {
    alias: {
      '@assets': path.resolve(__dirname, '../src/assets/'),
      '@authentication': path.resolve(
        __dirname,
        '../src/modules/authentication/index.ts'
      ),
      '@global': path.resolve(__dirname, '../src/modules/global/index.ts'),
      '@core': path.resolve(__dirname, '../src/modules/core/index.ts'),
      '@sass': path.resolve(__dirname, '../src/modules/sass/'),
    },
    extension: ['.js', '.sass', '.ts', '.tsx'],
  },
}
