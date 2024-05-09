import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import {
  AuthenticationHoc,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  useAuthenticationContext,
} from '@authentication';
import { RootLayout, HomePage, ExplorePage, ProfilePage } from '@core';
import { useCurrentPath, ErrorPage, ReactProps } from '@global';
import ROUTE, {
  AUTHORIZED_ROUTE,
  isAuthorizedRoute,
  UNAUTHORIZED_ROUTE,
} from './route';

interface ProtectedRouteProps extends ReactProps {
  children: JSX.Element;
}
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session } = useAuthenticationContext();
  const token = session.get();
  const currentPath = useCurrentPath();

  if (isAuthorizedRoute(currentPath) && !token)
    return <Navigate to={ROUTE.LOGIN} />;
  if (!isAuthorizedRoute(currentPath) && token) return <ErrorPage />;

  return children;
}

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '*',
      element: <ErrorPage />,
    },
    {
      element: (
        <ProtectedRoute>
          <RootLayout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        { path: ROUTE.HOME, element: <HomePage /> },
        { path: ROUTE.EXPLORE, element: <ExplorePage /> },
        { path: ROUTE.PROFILE, element: <ProfilePage /> },
      ],
    },
    {
      element: (
        <ProtectedRoute>
          <AuthenticationHoc />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        { path: ROUTE.LOGIN, element: <LoginPage /> },
        { path: ROUTE.REGISTER, element: <RegisterPage /> },
        { path: 'forgot-password', element: <ForgotPasswordPage /> },
        { path: 'reset-password', element: <ResetPasswordPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
