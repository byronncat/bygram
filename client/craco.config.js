const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@auth': path.resolve(__dirname, 'src/modules/auth/index.ts'),
      '@global': path.resolve(__dirname, 'src/modules/global/index.ts'),
      '@core': path.resolve(__dirname, 'src/modules/core/index.ts'),
      '@sass': path.resolve(__dirname, 'src/modules/sass/'),
    },
    extension: ['.js', '.sass', '.ts', '.tsx'],
  },
};
