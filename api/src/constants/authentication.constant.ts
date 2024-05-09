export enum LoginResult {
  NOT_EXIST = 'User does not exist',
  INCORRECT_PASSWORD = 'Incorrect password',
  SUCCESS = 'Logged in successfully',
}

export enum RegisterResult {
  USERNAME_EXISTS = 'Username already exists',
  EMAIL_EXISTS = 'Email already exists',
  SUCCESS = 'Registered successfully',
}
