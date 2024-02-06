import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../../assets/imgs/logo.svg";

function Sidebar() {
  const [activeLink, setActiveLink] = useState("Home");

  const activeHandler = (path: string) => {
    setActiveLink(path);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    return <Navigate to="/auth/login" />;
  };

  return (
    <>
      <nav className="sidebar h-100 p-3 d-flex flex-column flex-shrink-0 position-absolute">
        <Link
          to="/"
          className="brand d-flex justify-content-center align-items-center my-2 text-decoration-none"
        >
          <img src={logo} alt="logo" width="48" height="48" />
          <span className="brand-name ms-2 fs-2">Bygram</span>
        </Link>
        <hr />
        <div className="h-100 p-3 d-flex flex-column justify-content-between">
          <ul className="nav nav-pills flex-column">
            <li className="nav-item fs-5">
              <Link
                to="/"
                className={`nav-link p-3 mb-3 ${activeLink === "Home" ? "active" : ""}`}
                aria-current="page"
                onClick={() => activeHandler("Home")}
              >
                <i className="nav-link-icon d-inline-block fa-solid fa-house me-3 fs-4"></i>
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`nav-link p-3 mb-3 ${activeLink === "Search" ? "active" : ""}`}
                aria-current="page"
                onClick={() => activeHandler("Search")}
              >
                <i className="nav-link-icon d-inline-block fa-solid fa-magnifying-glass me-3 fs-4"></i>
                Search
              </Link>
              <Link
                to="/"
                className={`nav-link p-3 mb-3 ${activeLink === "Explore" ? "active" : ""}`}
                aria-current="page"
                onClick={() => activeHandler("Explore")}
              >
                <i className="nav-link-icon d-inline-block fa-regular fa-compass me-3 fs-4"></i>
                Explore
              </Link>
              <Link
                to="/"
                className={`nav-link p-3 mb-3 ${activeLink === "Messages" ? "active" : ""}`}
                aria-current="page"
                onClick={() => activeHandler("Messages")}
              >
                <i className="nav-link-icon d-inline-block fa-solid fa-comments me-3 fs-4"></i>
                Messages
              </Link>
              <Link
                to="/"
                className={`nav-link p-3 mb-3 ${activeLink === "Create" ? "active" : ""}`}
                aria-current="page"
                onClick={() => activeHandler("Create")}
              >
                <i className="nav-link-icon d-inline-block fa-regular fa-square-plus me-3 fs-4"></i>
                Create
              </Link>
              <Link
                to="/"
                className={`nav-link p-3 mb-3 ${activeLink === "Profile" ? "active" : ""}`}
                aria-current="page"
                onClick={() => activeHandler("Profile")}
              >
                <i className="nav-link-icon d-inline-block fa-solid fa-user me-3 fs-4"></i>
                Profile
              </Link>
            </li>
          </ul>
          <div className="dropup">
            <button
              className="btn dropdown-toggle w-100 p-3 border-0 d-flex align-items-center fs-4"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-bars me-3 fs-3"></i>
              More
            </button>
            <ul className="dropdown-menu py-3 fs-5">
              <li>
                <a className="dropdown-item p-2 ps-3" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item p-2 ps-3" href="/auth/login" onClick={logoutHandler}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
