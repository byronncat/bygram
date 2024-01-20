import { Express, Router } from 'express';
const authRouter = require('./auth/index');

interface Route {
  path: string;
  router: Router;
}

const routes: Route[] = [
  {
    path: '/auth/login',
    router: authRouter.loginRouter
  },
  {
    path: '/auth/register',
    router: authRouter.registerRouter
  },
]

module.exports = function setRoutes(app: Express) {
  routes.forEach((route: Route) => {
    app.use(`/api${route.path}`, route.router);
  });
}