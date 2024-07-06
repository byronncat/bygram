import { Express, Router } from 'express';

import { user } from '@middlewares';
import authenticationRouter from './authentication.api';
import postRouter from './post.api';
import profileRouter from './profile.api';

import utilsRouter from './utils/utils.route';

type APIRoute = {
  path: string;
  router: Router;
  protected: boolean;
};

const apis: APIRoute[] = [
  {
    path: '',
    router: authenticationRouter,
    protected: false,
  },
  {
    path: '/profile',
    router: profileRouter,
    protected: true,
  },
  {
    path: '/post',
    router: postRouter,
    protected: true,
  },
  {
    path: '/send-email',
    router: utilsRouter,
    protected: false,
  },
];

export default function configureApi(app: Express) {
  const unprotectedAPIs = apis.filter((api) => !api.protected);
  unprotectedAPIs.forEach((api: APIRoute) => {
    app.use(`/api${api.path}`, api.router);
  });

  const protectedAPIs = apis.filter((api) => api.protected);
  app.use(user.authenticating);
  protectedAPIs.forEach((api: APIRoute) => {
    app.use(`/api${api.path}`, api.router);
  });
}
