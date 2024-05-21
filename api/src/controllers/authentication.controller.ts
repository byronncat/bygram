import { Request, Response } from 'express';
import { signedCookie } from 'cookie-parser';

import { getSession, removeSession } from '@/database/access';
import { jwt } from '@libraries';
import { accountService } from '@services';
import { logger } from '@utilities';
import { LoginResult, RegisterResult, StatusCode, TIME } from '@constants';
import type { Account, Identity, API } from '@types';

export async function logIn(
  req: Request,
  res: Response,
): Promise<Response<API>> {
  const { email, password } = req.body as Account;
  try {
    const result: Identity = await accountService.login(email, password);

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
        req.session.user = { id: result.userId! };
        res.cookie('user_id', jwt.generateToken(result.userId!), {
          maxAge: TIME.COOKIE_MAX_AGE,
        });
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

export async function register(
  req: Request,
  res: Response,
): Promise<Response<API>> {
  const registerData = req.body as Account;

  try {
    const result: Identity = await accountService.register(registerData);

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
        req.session.user = { id: result.userId! };
        res.cookie('user_id', jwt.generateToken(result.userId!), {
          maxAge: TIME.COOKIE_MAX_AGE,
        });
        return res.status(StatusCode.OK).json({
          success: true,
          message: RegisterResult.SUCCESS,
        });
      default:
        throw new Error('Invalid register result');
    }
  } catch (error) {
    logger.error(JSON.stringify(error), 'Login Controller');
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error, register failed',
    });
  }
}

export async function logOut(
  req: Request,
  res: Response,
): Promise<Response<API>> {
  try {
    const sessionCookie = req.cookies.session_id;
    const sessionId = signedCookie(
      sessionCookie,
      process.env.TOKEN_SECRET || 'secret',
    );

    if (!sessionId) {
      return res.status(StatusCode.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const removedSessions = await removeSession(sessionId);
    if (removedSessions > 0) {
      res.clearCookie('session_id');
      res.clearCookie('user_id');

      return res.status(StatusCode.OK).json({
        success: true,
        message: 'Logged out',
      });
    } else {
      return res.status(StatusCode.OK).json({
        success: true,
        message: 'No session found or already logged out',
      });
    }
  } catch (error) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error, logout failed',
    });
  }
}

export async function authenticate(
  req: Request,
  res: Response,
): Promise<Response<API>> {
  let result = {
    statusCode: StatusCode.UNAUTHORIZED,
    respond: {
      success: false,
      message: 'Unauthorized',
    } as API,
  };

  try {
    const sessionCookie = req.cookies.session_id;
    const sessionId = signedCookie(
      sessionCookie,
      process.env.TOKEN_SECRET || 'secret',
    );

    if (sessionId) {
      if (await getSession(sessionId)) {
        result = {
          statusCode: StatusCode.OK,
          respond: {
            success: true,
            message: 'Authorized',
          },
        };
      }
    }
  } catch (error) {
    logger.error(JSON.stringify(error), 'Authentication Controller');
    result = {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      respond: {
        success: false,
        message: 'Internal server error, authentication failed',
      },
    };
  }

  return res.status(result.statusCode).json(result.respond);
}
