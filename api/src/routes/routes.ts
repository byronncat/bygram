import { Express, Router } from 'express';

import authenticationRouter from './authentication.route';

import postRouter from './post/post.route';
import profileRouter from './profile/profile.route';
import utilsRouter from './utils/utils.route';

type Route = {
  path: string;
  router: Router;
};

const routes: Route[] = [
  {
    path: '',
    router: authenticationRouter,
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
