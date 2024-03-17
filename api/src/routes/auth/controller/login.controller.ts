import { NextFunction, Request, Response } from 'express';
import { IVerifyOptions } from 'passport-local';
import { passport } from '@libs';
import { Account, API } from '@types';
import { LoginAPI } from './auth.route';
import { accountService } from '@services';

async function validateInformation(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    'local-login',
    async function (error: any, user: Account, info: IVerifyOptions) {
      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        } as API);
      }
      if (!user) {
        return res.status(401).json({
          success: false,
          message: info.message,
        } as API);
      }

      const username = await accountService.getUsernameByID(user.id!);
      return res.status(200).json({
        success: true,
        message: info.message,
        data: { ...user, username },
      } as LoginAPI);
    }
  )(req, res, next);
}

export default [validateInformation];
