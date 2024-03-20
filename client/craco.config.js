const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components/index.ts'),
      '@contexts': path.resolve(__dirname, 'src/contexts/index.ts'),
      '@hooks': path.resolve(__dirname, 'src/hooks/index.ts'),
      '@layouts': path.resolve(__dirname, 'src/layouts/index.ts'),
      '@pages': path.resolve(__dirname, 'src/pages/index.ts'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@services': path.resolve(__dirname, 'src/services/index.ts'),
      '@types': path.resolve(__dirname, 'src/types/index.d.ts'),
    },
    extension: ['.js', '.sass', '.ts', '.tsx'],
  },
};
