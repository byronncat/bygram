import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  moduleNameMapper: {
    '@assets/(.*)$': '<rootDir>/src/assets/$1',
    '@authentication': '<rootDir>/src/modules/authentication/index.ts',
    '@global': '<rootDir>/src/modules/global/index.ts',
    '@core': '<rootDir>/src/modules/core/index.ts',
    '@sass/(.*)$': '<rootDir>/src/modules/sass/$1',
    '^axios$': 'axios/dist/node/axios.cjs',
  },
  transform: {
    '^.+\\.(ts|tsx|js)$': 'ts-jest',
  },
}

export default jestConfig
