import { API } from '@global'
export * from './authentication.d'
export * from './react-hook-form.d'
export * from './layout.d'

export interface LoginAPI extends API {
  data?: UserToken
}

export interface RegisterAPI extends API {
  data?: UserToken
}
