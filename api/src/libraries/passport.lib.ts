import passport from 'passport';
import { IStrategyOptions, Strategy as LocalStrategy } from 'passport-local';
import { accountService } from '@services';
import { logger } from '@utilities';
import { Account, Identity } from '@types';

passport.use(
  'local-register',
  new LocalStrategy(
    {
      usernameField: 'email',
    } as IStrategyOptions,
    function verify(email, password, done) {
      accountService
        .registerAuthenticate(email)
        .then(({ user, message }: any) => {
          if (user) return done(null, user, { message });
          else return done(null, false, { message });
        })
        .catch((error: any) => {
          logger.error(`${error}`, 'Passport');
          return done(error);
        });
    }
  )
);

passport.serializeUser(function (user: any, done) {
  console.log('serialize', user);
  done(null, user.id);
});

passport.deserializeUser(function (id: Account['id'], done) {
  console.log('deserialize', id);
  done(null, { id, email: 'testNe' });
  // accountService
  //   .getByID(id!)
  //   .then((user: Account | null) => {
  //     done(null, user!);
  //   })
  //   .catch((error: any) => {
  //     done('helo be');
  //   });
});

export default passport;
