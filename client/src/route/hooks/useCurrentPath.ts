import { matchRoutes, useLocation } from 'react-router-dom';
import { ROUTE } from '@route';

const routes = Object.values(ROUTE).map((path) => ({ path }));

const useCurrentPath = () => {
  const location = useLocation();
  const [{ route }] = matchRoutes(routes, location) || [];
  return route.path;
};

export default useCurrentPath;
