import { Express, Router } from "express";
import authRouter from "./auth/index";
import postRouter from "./post/post.route";
import profileRouter from "./profile/profile.route";

type Route = {
  path: string;
  router: Router;
}

const routes: Route[] = [
  {
    path: "/auth/login",
    router: authRouter.loginRouter,
  },
  {
    path: "/auth/register",
    router: authRouter.registerRouter,
  },
  {
    path: "/auth/send-email",
    router: authRouter.sendEmailRouter,
  },
  {
    path: "/post",
    router: postRouter,
  },
  {
    path: "/profile",
    router: profileRouter,
  },
];

module.exports = function setRoutes(app: Express) {
  routes.forEach((route: Route) => {
    app.use(`/api${route.path}`, route.router);
  });
};
