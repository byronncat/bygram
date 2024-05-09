import path from 'path'
import { compilerOptions } from '../tsconfig.json'

const alias = Object.keys(compilerOptions.paths).reduce((acc, key) => {
  const value = compilerOptions.paths[key][0]
  const name = key.replace('/*', '')
  acc[name] = path.resolve(__dirname, '..', value.replace('/*', ''))
  return acc
}, {})

const config = {
  alias,
  extension: ['.js', '.sass', '.ts', '.tsx'],
  test: /\.tsx?$/,
  exclude: /\.test.tsx?$/,
  use: 'awesome-typescript-loader?silent=true',
}

export default config
