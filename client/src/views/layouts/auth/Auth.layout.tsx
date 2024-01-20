import { Outlet, Navigate } from "react-router-dom";

import authGif from "../../assets/imgs/auth.gif";
import logo from "../../assets/imgs/logo.svg";
import "./Auth.layout.sass";

function AuthLayout() {
  const isAuthenticated = false;

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <>
      <section>
        <div className="w-100 h-100 d-flex">
          <div className="col-lg-6 d-none d-lg-block overflow-hidden">
            <img src={authGif} className="h-100" alt="auth-page-image" />
          </div>

          <div className="form-side col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center">
            <span>
              <img className="brand-logo mb-2" src={logo} alt="logo" />
            </span>
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
}

export default AuthLayout;
