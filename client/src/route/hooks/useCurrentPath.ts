import { matchRoutes, useLocation } from 'react-router-dom';
import { ROUTE } from '@route';

const routes = Object.values(ROUTE).map((path) => ({ path }));

export default function useCurrentPath() {
  const location = useLocation();
  const [{ route }] = matchRoutes(routes, location) || [];
  return route.path;
}
