import { Express, Router } from 'express';

import authenticationRouter from './authentication.api';
import profileRouter from './profile.api';

import postRouter from './post/post.route';
import utilsRouter from './utils/utils.route';

type API = {
  path: string;
  router: Router;
};

const routes: API[] = [
  {
    path: '',
    router: authenticationRouter,
  },
  {
    path: '/profile',
    router: profileRouter,
  },
  {
    path: '/post',
    router: postRouter,
  },
  {
    path: '/send-email',
    router: utilsRouter,
  },
];

export default function setAPI(app: Express) {
  routes.forEach((route: API) => {
    app.use(`/api${route.path}`, route.router);
  });
}
