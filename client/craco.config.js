const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components/index.ts'),
      '@hooks': path.resolve(__dirname, 'src/hooks/index.ts'),
      '@layouts': path.resolve(__dirname, 'src/layouts/index.ts'),
      '@pages': path.resolve(__dirname, 'src/pages/index.ts'),
      '@sass': path.resolve(__dirname, 'src/sass/'),
      '@services': path.resolve(__dirname, 'src/services/index.ts'),
    },
    extension: ['.js', '.sass', '.ts', '.tsx'],
  },
};
