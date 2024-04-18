export type IdentityStrings = 'Authorized' | 'Unauthorized' | 'Unknown'

export type UserData = {
  id: number
  username: string
  email: string
}

export type AuthenticationToken = {
  isAuthenticated: boolean
  identity: UserData | null
}

export type API = {
  readonly success: boolean
  readonly message: string
}
