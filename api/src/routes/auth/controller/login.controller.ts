import { Request, Response } from 'express';
import { IVerifyOptions } from 'passport-local';
import { passport } from '@libs';
import { Account, LoginAPI } from '@types';

function validateInformation(req: Request, res: Response) {
  passport.authenticate(
    'local-login',
    async function (error: any, user: Account, info: IVerifyOptions) {
      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        } as LoginAPI);
      }
      if (!user) {
        let statusCode = info.message === 'No user found' ? 404 : 401;
        return res.status(statusCode).json({
          success: false,
          message: info.message,
        } as LoginAPI);
      }
      return res.status(200).json({
        success: true,
        message: info.message,
        data: { ...user },
      } as LoginAPI);
    }
  )(req, res);
}

export default [validateInformation];
