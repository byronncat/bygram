import jwt from 'jsonwebtoken';

export function generateAccessToken(
  payload: string | object | Buffer,
  options?: jwt.SignOptions,
) {
  return jwt.sign(payload, process.env.TOKEN_SECRET as string, options);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.TOKEN_SECRET as string);
}
