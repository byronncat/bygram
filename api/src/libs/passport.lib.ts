import passport from "passport";
import { IStrategyOptions, Strategy as LocalStrategy } from "passport-local";
import { accountService } from "@services";
import { escapeRegExp } from "@utils";
import { IAccount } from "@type";

passport.use(
  "local-login",
  new LocalStrategy(async function verify(username, password, done) {
    password = escapeRegExp(password);
    accountService
      .get({ username, password }, { and: true, one: true })
      .then((user: IAccount | IAccount[] | null) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((error: any) => {
        return done(error);
      });
  })
);

passport.use(
  "local-register",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "email",
    } as IStrategyOptions,
    function verify(username, email, done) {
      console.log(username, email);
      accountService
        .get({ username, email }, { or: true })
        .then((users: IAccount | IAccount[] | null) => {
          if (users) {
            return done(null, false, { message: "Username or email already exists" });
          } else {
            const user: IAccount = { username, email };
            return done(null, user);
          }
        })
        .catch((error: any) => {
          return done(error);
        });
    }
  )
);

passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id: any, done) {
  console.log(id);
  accountService
    .get({ id }, { one: true })
    .then((user: IAccount | IAccount[] | null) => {
      done(null, user!);
    })
    .catch((error: any) => {
      done(error);
    });
});

export default passport;
