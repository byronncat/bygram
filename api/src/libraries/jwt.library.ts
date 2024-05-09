import jwt from 'jsonwebtoken';
import { generateRandomString } from '@utilities';

export function generateAccessToken(
  payload: string | object | Buffer,
  options?: jwt.SignOptions,
) {
  return jwt.sign(
    payload,
    process.env.TOKEN_SECRET || generateRandomString(12),
    options,
  );
}
