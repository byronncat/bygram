import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout, RootLayout } from '@layouts';
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  HomePage,
  ExplorePage,
  ProfilePage,
  ErrorPage,
} from '@pages';

function Router() {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: 'explore', element: <ExplorePage /> },
        { path: ':username/:uid', element: <ProfilePage /> },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'forgot-password', element: <ForgotPasswordPage /> },
        { path: 'reset-password', element: <ResetPasswordPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
