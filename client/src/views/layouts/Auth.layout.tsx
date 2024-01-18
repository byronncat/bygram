import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import authGif from "../assets/imgs/auth.gif";

function AuthLayout() {
    const isAuthenticated = false;

    return isAuthenticated ? (
        <Navigate to="/" />
    ) : (
        <>
            <section>
                <div className="w-100 h-100 d-flex">
                    <div className="col-xl-6 d-none d-xl-block overflow-hidden">
                      <img src={ authGif } className="h-100" alt="auth-page-image" />
                    </div>

                    <div className="col-12 col-xl-6 d-flex justify-content-center align-items-center">
                        <Outlet />
                    </div>
                </div>
            </section>
        </>
    );
}

export default AuthLayout;
