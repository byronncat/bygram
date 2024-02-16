import { NextFunction, Request, Response } from "express";
import passport from "@libs/passport.lib";
import { AccountSchema } from "@/type";

interface CustomRequest<T> extends Request {
  body: T;
}

function saveUser(req: CustomRequest<AccountSchema>, res: Response, next: NextFunction) {
  const data = req.body as AccountSchema;
  res.locals.user = data;
  next();
}

async function validateInformation(
  req: CustomRequest<AccountSchema>,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "local-register",
    function (error: any, user: AccountSchema[], info: any) {
      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }

      if (user) {
        res.locals.user = user;
        return next();
      } else {
        return res.status(401).json({
          success: false,
          message: info.message,
        });
      }
    }
  )(req, res, next);
}

const accountService = require("@services/account.service");
async function addUser(req: CustomRequest<AccountSchema>, res: Response) {
  const data = res.locals.user;
  await accountService
    .addUser(data)
    .then((result: AccountSchema) => {
      delete data.password;
      res.status(201).json({
        success: true,
        message: "Account created successfully",
        user: {
          id: result.id,
          ...data,
        }
      });
    })
    .catch((error: any) => {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    });
}

module.exports = [saveUser, validateInformation, addUser];
