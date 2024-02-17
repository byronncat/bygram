import { NextFunction, Request, Response } from "express";
import passport from "@libs/passport.lib";
import { AccountSchema } from "@/type";

interface Information {
  message: string;
}

interface CustomRequest<T> extends Request {
  body: T;
}

async function validateInformation(req: CustomRequest<AccountSchema>, res: Response, next: NextFunction) {
  passport.authenticate(
    "local-login",
    function (error: any, user: AccountSchema, info: Information) {
      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (user) {
        // ! TODO: Set cookie
        // res.cookie('user', user, { maxAge: 900000, httpOnly: true })
        delete user.password;
        return res.status(200).json({
          success: true, 
          message: info.message,
          user,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: info.message,
        })
      }
    })(req, res, next);
};

module.exports = [
  validateInformation,
];
