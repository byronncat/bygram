import { Routes, Route } from 'react-router-dom';
import { AuthLayout, RootLayout } from "views/layouts";
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, HomePage } from "views/pages";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="/auth/login" element={<LoginPage />} /> 
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      </Route>
    </Routes>
  );
};

export default App;