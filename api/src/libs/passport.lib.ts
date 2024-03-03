import passport from 'passport';
import { IStrategyOptions, Strategy as LocalStrategy } from 'passport-local';
import { accountService } from '@services';
import { escapeRegExp } from '@utils';
import { Account } from '@type';

passport.use(
  'local-login',
  new LocalStrategy(async function verify(username, password, done) {
    password = escapeRegExp(password);
    accountService
      .get({ username, password }, { and: true, one: true })
      .then((user: Account | Account[] | null) => {
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
  'local-register',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'email',
    } as IStrategyOptions,
    function verify(username, email, done) {
      accountService
        .get({ username, email }, { or: true })
        .then((users: Account | Account[] | null) => {
          if (users) {
            return done(null, false, { message: 'Username or email already exists' });
          } else {
            const user: Account = { username, email };
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
  accountService
    .get({ id }, { one: true })
    .then((user: Account | Account[] | null) => {
      done(null, user!);
    })
    .catch((error: any) => {
      done(error);
    });
});

export default passport;
