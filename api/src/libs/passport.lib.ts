import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
const accountService = require("@services/account.service");

passport.use(
  "local-login",
  new LocalStrategy(async function verify(username, password, done) {
    accountService
      .verifyUser({ username, password })
      .then((user: any) => {
        if (user) {
          return done(null, user, { message: "Logged in successfully" });
        } else {
          return done(null, false, { message: "Incorrect username or password" });
        }
      })
      .catch((error: any) => {
        return done(error);
      });
  })
);

passport.use(
  "local-register",
  new LocalStrategy({ passReqToCallback: true }, function verify(req, username, password, done) {
    const email = req.body.email;
    accountService
      .getUsers({ username, email })
      .then((users: any) => {
        if (users.length !== 0) {
          return done(null, false, { message: "Username or email already exists" });
        } else {
          const user = req.body;
          return done(null, user);
        }
      })
      .catch((error: any) => {
        return done(error);
      });
  })
);

passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id: any, done) {
  accountService
    .getUserByUsername(id)
    .then((data: any) => {
      done(null, data);
    })
    .catch((error: any) => {
      done(error);
    });
});

export default passport;
