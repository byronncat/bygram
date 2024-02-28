import { NextFunction, Request, Response } from "express";
import passport from "@libs/passport.lib";
import { IAccount, IAPI } from "@/type";

async function validateInformation(
  req: Request<{}, {}, IAccount>,
  res: Response,
  next: NextFunction
) {
  passport.authenticate("local-login", function (error: any, user: IAccount) {
    let statusCode: number;
    let api: IAPI;
    if (error) {
      statusCode = 500;
      api = {
        success: false,
        message: error.message,
      };
    }
    if (user) {
      delete user.password;
      statusCode = 200;
      api = {
        success: true,
        message: "Logged in successfully",
        data: user,
      };
    } else {
      statusCode = 401;
      api = {
        success: false,
        message: "Incorrect username or password",
      };
    }
    return res.status(statusCode).json(api);
  })(req, res, next);
}

export default [validateInformation];
