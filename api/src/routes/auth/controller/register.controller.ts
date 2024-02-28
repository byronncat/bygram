import { NextFunction, Request, Response } from "express";
import passport from "@libs/passport.lib";
import { IAPI, IAccount } from "@/type";

function saveFormRequest(req: Request<{}, {}, IAccount>, res: Response, next: NextFunction) {
  const data = req.body as IAccount;
  res.locals.user = data;
  next();
}

async function validateInformation(
  req: Request<{}, {}, IAccount>,
  res: Response,
  next: NextFunction
) {
  passport.authenticate("local-register", function (error: any, user: IAccount) {
    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      } as IAPI);
    }

    if (user) {
      return next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Username or email already exists",
      } as IAPI);
    }
  })(req, res, next);
}

import { accountService } from "@services";
async function addUser(req: Request<{}, {}, IAccount>, res: Response) {
  const data: IAccount = res.locals.user;
  await accountService
    .create(data)
    .then((result: IAccount) => {
      delete data.password;
      res.status(201).json({
        success: true,
        message: "Account created successfully",
        data: {
          id: result.id,
          ...data,
        },
      } as IAPI);
    })
    .catch((error: any) => {
      res.status(500).json({
        success: false,
        message: error.message,
      } as IAPI);
    });
}

export default [saveFormRequest, validateInformation, addUser];
