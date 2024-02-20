import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthLayout, RootLayout } from "./layouts/index";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  HomePage,
  ProfilePage,
} from "./pages/index";
import { Authentication } from "./components/index";

function App() {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      errorElement: <div>404 not found</div>,
      children: [
        { path: "/", element: <HomePage /> },
        { path: ":user-name", element: <ProfilePage />},
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "forgot-password", element: <ForgotPasswordPage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
      ],
    },
  ]);

  return (
    <>
      <Authentication>
        <RouterProvider router={router} />
      </Authentication>
    </>
  );
}

export default App;
