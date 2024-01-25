import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "../../../common/components/index"
import "./root.layout.sass";

function RootLayout() {
  let isAuthenticated = true;

  return isAuthenticated ? (
    <>
      <main className="main-background row w-100 h-100 m-0 p-0 d-flex flex-column flex-shrink-0 bg-dark">
        <Sidebar /> 
        <div className="col-4 h-100 p-0">
        </div>
        <div className="h-100 col-8">
          <Outlet />
        </div>
      </main>
    </>
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default RootLayout