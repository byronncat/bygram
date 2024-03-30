const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@auth': path.resolve(__dirname, 'src/modules/auth/index.ts'),
      '@global': path.resolve(__dirname, 'src/modules/global/index.ts'),
      '@core': path.resolve(__dirname, 'src/modules/core/index.ts'),
      '@sass': path.resolve(__dirname, 'src/modules/sass/'),
    },
    extension: ['.js', '.sass', '.ts', '.tsx'],
  },
};
