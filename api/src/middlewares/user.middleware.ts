import { StatusCode } from '@constants';
import { jwt } from '@libraries';
import type { Request, Response, NextFunction } from 'express';

export function authenticating(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.cookies.user) {
    req.user = jwt.parseToken(req.cookies.user);
  } else {
    return res.status(StatusCode.UNAUTHORIZED).json({
      success: false,
      message: 'Unauthorized',
    });
  }
  next();
}
