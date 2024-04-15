export type IdentityStrings = 'Authorized' | 'Unauthorized' | 'Unknown'

export type AuthenticationToken = {
  isAuthenticated: boolean
  user: UserToken | null
}

export interface API {
  readonly success: boolean
  readonly message: string
}
