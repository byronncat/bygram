export type IdentityStrings = 'Authorized' | 'Unauthorized' | 'Unknown'

export type AuthenticationStorage = {
  isAuthenticated: boolean
  user: UserToken | null
}

export interface API {
  success: boolean
  message: string
}
