import { NextFunction, Request, Response } from 'express';
import { IVerifyOptions } from 'passport-local';
import { passport } from '@libs';
import { accountService } from '@services';
import { RegisterData } from '@services/types';
import { API, Account } from '@types';

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
        } as API);
      }

      if (user) {
        return next();
      } else {
        return res.status(401).json({
          success: false,
          message: info.message,
        } as API);
      }
    }
  )(req, res, next);
}

async function addUser(req: Request, res: Response) {
  const data: RegisterData = res.locals.user;
  await accountService
    .register(data)
    .then((user) => {
      res.status(200).json({
        success: true,
        message: 'Registered successfully',
        data: user,
      } as API);
    })
    .catch((error: any) => {
      res.status(500).json({
        success: false,
        message: error.message,
      } as API);
    });
}

export default [saveFormRequest, validateInformation, addUser];
