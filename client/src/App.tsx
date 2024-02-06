import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout, RootLayout } from "./layouts/index";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  HomePage,
} from "./pages/index";
import { Authentication } from "./components/index";

function App() {
  return (
    <Authentication>
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
          </Route>

          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="dashboard" element={<div>dashboard</div>} />
          </Route>

          <Route path='*' element={<div>Error</div>} />
        </Routes>
      </BrowserRouter>
    </Authentication>
  );
}

export default App;
