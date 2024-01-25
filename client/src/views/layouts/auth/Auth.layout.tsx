import { Outlet, Navigate } from "react-router-dom";

import authGif from "../../assets/imgs/auth.gif";
import logo from "../../assets/imgs/logo.svg";
import "./auth.layout.sass";

function AuthLayout() {
  const isAuthenticated = false;

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <>
      <div className="w-100 h-100 d-flex">
        <div className="col-md-6 d-none d-md-block overflow-hidden">
          <img src={authGif} className="h-100" alt="auth-page-image" />
        </div>

        <div className="form-side col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
          <span>
            <img className="brand-logo mb-2 glowing-icon" src={logo} alt="logo" />
          </span>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
