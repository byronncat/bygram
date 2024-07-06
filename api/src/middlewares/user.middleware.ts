import { StatusCode } from '@constants';
import { jwt } from '@libraries';
import type { Request, Response, NextFunction } from 'express';
import type { UserToken } from '@types';

export function authenticating(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.cookies.user) {
    res.locals.user = jwt.parseToken(req.cookies.user) as UserToken;
  } else {
    return res.status(StatusCode.UNAUTHORIZED).json({
      success: false,
      message: 'Unauthorized',
    });
  }
  next();
}
