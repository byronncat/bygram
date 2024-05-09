import { matchRoutes, useLocation } from 'react-router-dom'
import Route from '@/route'

const routes = Object.values(Route).map((path) => ({ path }))

export default function useCurrentPath() {
  const location = useLocation()
  const [{ route }] = matchRoutes(routes, location) || []
  return route.path
}
