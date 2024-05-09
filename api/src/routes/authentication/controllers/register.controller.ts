import { NextFunction, Request, Response } from 'express';
import { passport } from '@libraries';
import { accountService } from '@services';
import { Account, RegisterData, RegisterAPI } from '@types';
import { IVerifyOptions } from 'passport-local';

function saveFormRequest(req: Request, res: Response, next: NextFunction) {
  const data = req.body as RegisterData;
  res.locals.user = data;
  next();
}

async function validateInformation(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    'local-register',
    function (error: any, user: Account, info: IVerifyOptions) {
      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        } as RegisterAPI);
      }

      if (user) {
        return next();
      } else {
        return res.status(409).json({
          success: false,
          message: info.message,
        } as RegisterAPI);
      }
    }
  )(req, res, next);
}

async function addUser(req: Request, res: Response) {
  const data: RegisterData = res.locals.user;
  return await accountService
    .register(data)
    .then((user) => {
      return res.status(200).json({
        success: true,
        message: 'Registered successfully',
        data: user,
      } as RegisterAPI);
    })
    .catch((error: any) => {
      return res.status(500).json({
        success: false,
        message: error.message,
      } as RegisterAPI);
    });
}

export default [saveFormRequest, validateInformation, addUser];
