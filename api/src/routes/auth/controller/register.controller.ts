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
import { Profile } from 'passport';
async function addUser(req: Request<{}, {}, Account>, res: Response) {
  const data: Account = res.locals.user;
  let response = {
    success: false,
    message: '',
  } as API;
  let status: number = 500;
  await accountService
    .create(data)
    .then((result: Account) => {
      delete result.password;
      status = 201;
      response.data = {
        id: result.id,
        ...data,
      };
    })
    .catch((error: any) => {
      response.message = error.message;
    });

  await accountService
    .createProfile({ uid: response.data.id, name: response.data.username })
    .then((data: any) => {
      response.success = true;
      response.message = 'User created';
      status = 201;
    })
    .catch((error: any) => {
      response.message = error.message;
    });

  res.status(status).json(response);
}

export default [saveFormRequest, validateInformation, addUser];
