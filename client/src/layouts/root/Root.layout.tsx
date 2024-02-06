import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "../../components/index";
import { useAuth } from "../../components/index";
import "./root.layout.sass";


function RootLayout() {
  const { authentication } = useAuth();

  return !authentication.isAuthenticated ? ( 
    <Navigate to="/auth/login" />
  ) : (
    <>
      <main className="main-background row w-100 h-100 m-0 p-0 d-flex flex-column flex-shrink-0 bg-dark">
        <Sidebar />
        <div className="col-4 h-100 p-0"></div>
        <div className="h-100 col-8">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default RootLayout;
