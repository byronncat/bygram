const PROTECTED_ROUTE = {
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
  ...PROTECTED_ROUTE,
  ...UNAUTHORIZED_ROUTE,
};

export { ROUTE, PROTECTED_ROUTE, UNAUTHORIZED_ROUTE };
