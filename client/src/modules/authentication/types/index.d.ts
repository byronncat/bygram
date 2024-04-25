import { API } from '@global'
export * from './authentication.d'
export * from './provider.d'
export * from './react-hook-form.d'

export interface LoginAPI extends API {
  data?: UserToken
}

export interface RegisterAPI extends API {
  data?: UserToken
}
