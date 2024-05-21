import jwt from 'jsonwebtoken';

export function generateToken(
  payload: string | object | Buffer,
  options?: jwt.SignOptions,
) {
  return jwt.sign(payload, process.env.TOKEN_SECRET as string, options);
}
