import { userService } from '@services';
import { sessionMiddleware } from '@middlewares';
import { logger } from '@utilities';
import { LoginResult, RegisterResult, StatusCode } from '@constants';

import type { NextFunction, Request, Response } from 'express';
import type { Account, Identity, API } from '@types';

async function logIn(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<API>> {
  const { email, password } = req.body as Account;
  try {
    const result: Identity = await userService.login(email, password);

    switch (result.message) {
      case LoginResult.NOT_EXIST:
        return res.status(StatusCode.NOT_FOUND).json({
          success: false,
          message: LoginResult.NOT_EXIST,
        });
      case LoginResult.INCORRECT_PASSWORD:
        return res.status(StatusCode.UNAUTHORIZED).json({
          success: false,
          message: LoginResult.INCORRECT_PASSWORD,
        });
      case LoginResult.SUCCESS:
        res.locals.user = result.user;
        next();
        return res.status(StatusCode.OK).json({
          success: true,
          message: LoginResult.SUCCESS,
        });
      default:
        throw new Error('Invalid login result');
    }
  } catch (error) {
    logger.error(JSON.stringify(error), 'Login Controller');
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error, login failed',
    });
  }
}

async function register(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<API>> {
  const registerData = req.body as Account;

  try {
    const result: Identity = await userService.register(registerData);

    switch (result.message) {
      case RegisterResult.EMAIL_EXISTS:
        return res.status(StatusCode.CONFLICT).json({
          success: false,
          message: RegisterResult.EMAIL_EXISTS,
        });
      case RegisterResult.USERNAME_EXISTS:
        return res.status(StatusCode.CONFLICT).json({
          success: false,
          message: RegisterResult.USERNAME_EXISTS,
        });
      case RegisterResult.SUCCESS:
        res.locals.user = result.user;
        next();
        return res.status(StatusCode.OK).json({
          success: true,
          message: RegisterResult.SUCCESS,
        });
      default:
        throw new Error('Invalid register result');
    }
  } catch (error) {
    logger.error(JSON.stringify(error), 'Register Controller');
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error, register failed',
    });
  }
}

export default {
  logIn: [logIn, sessionMiddleware.save],
  register: [register, sessionMiddleware.save],
  authenticate: sessionMiddleware.authenticate,
  logout: sessionMiddleware.destroy,
};
