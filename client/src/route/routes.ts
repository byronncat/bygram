const AUTHORIZED_ROUTE = {
  HOME: '/',
  EXPLORE: '/explore',
  PROFILE: '/profile/:username',
};

const UNAUTHORIZED_ROUTE = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
};

const ROUTE = {
  ...AUTHORIZED_ROUTE,
  ...UNAUTHORIZED_ROUTE,
};

export function isAuthorizedRoute(path: string) {
  return Object.values(AUTHORIZED_ROUTE).includes(path);
}

export { ROUTE, AUTHORIZED_ROUTE, UNAUTHORIZED_ROUTE };
