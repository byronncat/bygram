const PROTECTED_ROUTE = {
  HOME: '/',
  EXPLORE: '/explore',
  PROFILE: '/profile/:username',
};

const PUBLIC_ROUTE = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
};

const ROUTE = {
  ...PROTECTED_ROUTE,
  ...PUBLIC_ROUTE,
};

export { ROUTE, PROTECTED_ROUTE, PUBLIC_ROUTE };
