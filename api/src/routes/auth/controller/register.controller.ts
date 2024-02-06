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
};

async function validateInformation(req: CustomRequest<AccountSchema>, res: Response, next: NextFunction) {
  passport.authenticate(
    "local-register",
    { session: false },
    function (err: any, user: AccountSchema[], info: any) {
      if (err) {
        return res.status(500).send(err);
      }
      
      if (user) {
        return next();
      } else {
        return res.status(401).send(info.message)
      }
    })(req, res, next);
};

const accountService = require("@services/account.service");
async function addUser(req: CustomRequest<AccountSchema>, res: Response) {
  const data = res.locals.user;
  await accountService
    .addUser(data)
    .then(() => {
      res.status(201).send({
        user: data,
        token: "test1234",
        message: "Account created successfully"
      });
    })
    .catch((error: any) => {
      res.status(500).send({ message: "Error creating account", error });
    });
};

module.exports = [
  saveUser,
  validateInformation,
  addUser,
];
