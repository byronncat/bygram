import { Express, Router } from 'express';
import authRouter from './auth/index';
import postRouter from './post/post.route';
import profileRouter from './profile/profile.route';
import utilsRouter from './utils/utils.route';

type Route = {
  path: string;
  router: Router;
};

const routes: Route[] = [
  {
    path: '/auth/login',
    router: authRouter.loginRouter,
  },
  {
    path: '/auth/register',
    router: authRouter.registerRouter,
  },
  {
    path: '/post',
    router: postRouter,
  },
  {
    path: '/profile',
    router: profileRouter,
  },
  {
    path: '/send-email',
    router: utilsRouter,
  },
];

module.exports = function setRoutes(app: Express) {
  routes.forEach((route: Route) => {
    app.use(`/api${route.path}`, route.router);
  });
};
