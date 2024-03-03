const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components/index.ts'),
      '@layouts': path.resolve(__dirname, 'src/layouts/index.ts'),
      '@pages': path.resolve(__dirname, 'src/pages/index.ts'),
      '@sass': path.resolve(__dirname, 'src/sass/'),
      '@utils': path.resolve(__dirname, 'src/utils/index.ts'),
    },
    extension: ['.js', '.sass', '.ts', '.tsx'],
  },
};
