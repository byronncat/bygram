import { Request, Response } from 'express';
import { jwt } from '@libraries';
import { accountService } from '@services';
import { LoginResult, StatusCode, TIME } from '@constants';
import { logger } from '@utilities';
import { Account, Identity, API, Token } from '@types';

interface LoginAPI extends API {
  data: {
    sessionId: Token;
  };
}

export async function logIn(
  req: Request,
  res: Response,
): Promise<Response<LoginAPI>> {
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
        res.cookie('user_id', result.userId, {
          maxAge: TIME.MONTH,
        });

        return res.status(StatusCode.OK).json({
          success: true,
          message: LoginResult.SUCCESS,
          data: {
            sessionId: jwt.generateAccessToken(req.sessionID),
          },
        });
      default:
        throw new Error('Invalid login result');
    }
  } catch (error: unknown) {
    logger.error(JSON.stringify(error), 'Login Controller');
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error, login failed',
    });
  }
}
