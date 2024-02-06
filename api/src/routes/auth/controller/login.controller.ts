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
        return res.status(500).send(error);
      }
      
      if (user) {
        res.cookie('user', user, { maxAge: 900000, httpOnly: true })
        return res.status(200).send({ 
          user,
          token: "test1234",
          message: info.message
        });
      } else {
        return res.status(401).send(info.message)
      }
    })(req, res, next);
};

module.exports = [
  validateInformation,
];
