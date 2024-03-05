import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import UploadPost from './UploadPost/UploadPost.component';
import styles from '@sass/rootLayout.module.sass';
import clsx from 'clsx';

function Sidebar() {
  const [activeLink, setActiveLink] = useState(sessionStorage.getItem('activeLink') || 'home');
  const [activeUploadPost, setIsActiveUploadPost] = useState(false);

  const sidebarLinks = [
    {
      name: 'home',
      icon: 'fa-solid fa-house',
      path: '/',
    },
    // {
    //   name: 'search',
    //   icon: 'fa-solid fa-magnifying-glass',
    // },
    // {
    //   name: 'explore',
    //   icon: 'fa-regular fa-compass',
    // },
    // {
    //   name: 'messages',
    //   icon: 'fa-solid fa-comments',
    // },
    {
      name: 'profile',
      icon: 'fa-solid fa-user',
      path: `/${JSON.parse(localStorage.getItem('user') || '{}').username}`,
    },
    // {
    //   name: 'settings',
    //   icon: 'fa-solid fa-cog',
    // },
    {
      name: 'logout',
      icon: 'fa-solid fa-sign-out',
      path: '/login',
    },
  ];

  const activeHandler = (path: string) => {
    sessionStorage.setItem('activeLink', path);
    setActiveLink(path);
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    return <Navigate to="/login" />;
  };

  return (
    <>
      <nav
        className={clsx(
          styles.sidebar,
          'float-start',
          'h-100 p-3',
          'd-flex flex-column flex-shrink-0'
        )}
      >
        <Link
          to="/"
          className={clsx(
            'mb-5',
            'd-flex justify-content-center align-items-center',
            'text-reset text-decoration-none'
          )}
          onClick={() => activeHandler('home')}
        >
          <img src="imgs/logo.svg" alt="logo" width="40" height="40" />
          <span className={clsx('ms-2 fs-2')}>Bygram</span>
        </Link>
        <div className={clsx('h-100 p-3', 'd-flex flex-column justify-content-between')}>
          <ul className={clsx('nav nav-pills', 'flex-column')}>
            <li className={clsx('nav-item', 'fs-6')}>
              {sidebarLinks.map((tag) => {
                return (
                  <Link
                    to={tag.path}
                    className={clsx(
                      styles[`sidebar-link`],
                      'nav-link',
                      'p-3 mb-3',
                      'text-reset text-capitalize',
                      activeLink === tag.name ? `active ${styles.active}` : ''
                    )}
                    aria-current="page"
                    onClick={() => activeHandler(tag.name)}
                  >
                    <i
                      className={clsx(
                        'nav-link-icon',
                        `fa-solid ${tag.icon}`,
                        'd-inline-block me-3',
                        'fs-5'
                      )}
                    ></i>
                    {tag.name}
                  </Link>
                );
              })}
              {/* <Link to="/" className={} aria-current="page" onClick={() => activeHandler('home')}>
                <i
                  className={clsx('nav-link-icon fa-solid fa-house', 'd-inline-block me-3', 'fs-5')}
                ></i>
                Home
              </Link>
              <Link
                // ! TODO: Add the following links to the sidebar
                to="/"
                className={clsx('nav-link', 'p-3 mb-3', activeLink === 'Home' ? 'active' : '')}
                aria-current="page"
                onClick={() => activeHandler('Search')}
              >
                <i className="nav-link-icon d-inline-block fa-solid fa-magnifying-glass me-3 fs-4"></i>
                Search
              </Link>
              <Link
                to="/"
                className={clsx('nav-link', 'p-3 mb-3', activeLink === 'Home' ? 'active' : '')}
                aria-current="page"
                onClick={() => activeHandler('Explore')}
              >
                <i className="nav-link-icon d-inline-block fa-regular fa-compass me-3 fs-4"></i>
                Explore
              </Link>
              <Link
                to="/"
                className={clsx('nav-link', 'p-3 mb-3', activeLink === 'Home' ? 'active' : '')}
                aria-current="page"
                onClick={() => activeHandler('Messages')}
              >
                <i className="nav-link-icon d-inline-block fa-solid fa-comments me-3 fs-4"></i>
                Messages
              </Link>
              <Button
                className={`nav-link w-100 p-3 mb-3 text-start`}
                aria-current="page"
                onClick={function () {
                  setIsActiveUploadPost(true);
                }}
              >
                <i
                  className={clsx(
                    'nav-link-icon fa-regular fa-square-plus',
                    'd-inline-block me-3',
                    'fs-5'
                  )}
                ></i>
                Create
              </Button>
              {activeUploadPost && <UploadPost closeFunction={setIsActiveUploadPost} />}
              <Link
                to={`/${JSON.parse(localStorage.getItem('user') || '{}').username}`}
                className={clsx('nav-link', 'p-3 mb-3', activeLink === 'profile' ? 'active' : '')}
                aria-current="page"
                onClick={() => activeHandler('profile')}
              >
                <i className="nav-link-icon d-inline-block fa-solid fa-user me-3 fs-4"></i>
                Profile
              </Link> */}
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
                <a className="dropdown-item p-2 ps-3" href="/login" onClick={logoutHandler}>
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
