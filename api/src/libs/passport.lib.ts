import passport from 'passport';
import { IStrategyOptions, Strategy as LocalStrategy } from 'passport-local';
import { logger } from '@utils';
import { accountService } from '@services';
import { Account } from '@types';
import { AuthenticationPassport } from '@services/types';

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    } as IStrategyOptions,
    async function verify(email, password, done) {
      accountService
        .loginAuthenticate(email, password)
        .then(({ user, message }: AuthenticationPassport) => {
          if (user) {
            return done(null, user, { message });
          } else {
            return done(null, false, { message });
          }
        })
        .catch((error: any) => {
          logger.error(`${error}`, 'Passport');
          return done(error);
        });
    }
  )
);

passport.use(
  'local-register',
  new LocalStrategy(
    {
      usernameField: 'email',
    } as IStrategyOptions,
    function verify(email, password, done) {
      accountService
        .registerAuthenticate(email)
        .then(({ user, message }: AuthenticationPassport) => {
          if (user) {
            return done(null, user, { message });
          } else {
            return done(null, false, { message });
          }
        })
        .catch((error: any) => {
          return done(error);
        });
    }
  )
);

passport.serializeUser(function (user: Account, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id: Account['id'], done) {
  accountService
    .getByID(id!)
    .then((user: Account | null) => {
      done(null, user!);
    })
    .catch((error: any) => {
      done(error);
    });
});

export default passport;
