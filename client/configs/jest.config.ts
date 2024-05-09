import type { JestConfigWithTsJest } from 'ts-jest'
import { compilerOptions } from '../tsconfig.json'

const moduleNameMapper = Object.keys(compilerOptions.paths).reduce(
  (acc, key) => {
    const value = compilerOptions.paths[key][0]
    const name = key.replace('/*', '/(.*)$')
    acc[name] = `<rootDir>/${value.replace('/*', '/$1')}`
    return acc
  },
  {
    '^axios$': 'axios/dist/node/axios.cjs',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  }
)

const config: JestConfigWithTsJest = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!**/index.{tsx,ts}',
    '!src/**/{constants,libraries}/**',
    '!src/{setupTests.ts,reportWebVitals.ts,setupProxy.js}',
  ],
  moduleNameMapper,
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
  ],
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  resetMocks: true,
}

export default config
