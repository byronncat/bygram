import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  LandingHoc,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  AuthenticationHoc,
} from '@authentication';
import { DashboardHoc, HomePage, ExplorePage, ProfilePage } from '@core';
import { ErrorPage } from '@global';
import { ROUTE } from '@route';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '*',
      element: <ErrorPage />,
    },
    {
      element: <AuthenticationHoc />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <DashboardHoc />,
          errorElement: <ErrorPage />,
          children: [
            { path: ROUTE.HOME, element: <HomePage /> },
            { path: ROUTE.EXPLORE, element: <ExplorePage /> },
            { path: ROUTE.PROFILE, element: <ProfilePage /> },
          ],
        },
        {
          element: <LandingHoc />,
          errorElement: <ErrorPage />,
          children: [
            { path: ROUTE.LOGIN, element: <LoginPage /> },
            { path: ROUTE.REGISTER, element: <RegisterPage /> },
            { path: 'forgot-password', element: <ForgotPasswordPage /> },
            { path: 'reset-password', element: <ResetPasswordPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
