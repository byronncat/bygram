import { NextFunction, Request, Response } from 'express';
import passport from '@libs/passport.lib';
import { API, Account } from '@/type';

function saveFormRequest(req: Request<{}, {}, Account>, res: Response, next: NextFunction) {
  const data = req.body as Account;
  res.locals.user = data;
  next();
}

async function validateInformation(
  req: Request<{}, {}, Account>,
  res: Response,
  next: NextFunction
) {
  passport.authenticate('local-register', function (error: any, user: Account) {
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
        message: 'Username or email already exists',
      } as API);
    }
  })(req, res, next);
}

import { accountService } from '@services';
async function addUser(req: Request<{}, {}, Account>, res: Response) {
  const data: Account = res.locals.user;
  await accountService
    .create(data)
    .then((result: Account) => {
      delete data.password;
      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        data: {
          id: result.id,
          ...data,
        },
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
