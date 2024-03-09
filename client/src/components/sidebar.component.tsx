import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '@sass/rootLayout.module.sass';
import clsx from 'clsx';
import { useAuth } from './authentication.component';
import { UploadPost } from '@components';

function Sidebar() {
  const [activeLink, setActiveLink] = useState(sessionStorage.getItem('activeLink'));
  const [username, setUsername] = useState('');

  useEffect(() => {
    setActiveLink(activeLink);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUsername(user.username);
  }, [activeLink]);

  const navigate = useNavigate();
  const { setAuthenticationStorage } = useAuth();
  function logoutHandler(event: any) {
    event.preventDefault();
    setAuthenticationStorage({ user: null, isAuthenticated: false });
    navigate('/login');
  }

  const [createPost, setCreatePost] = useState(false);
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
      name: 'create post',
      icon: 'fa-regular fa-square-plus',
      path: '#',
      notActive: true,
      function: () => {
        setCreatePost(!createPost);
      },
    },
    {
      name: 'profile',
      icon: 'fa-solid fa-user',
      path: `/${username}`,
    },
    {
      name: 'logout',
      icon: 'fa-solid fa-sign-out-alt',
      path: '/login',
      function: logoutHandler,
    },
    // {
    //   name: 'settings',
    //   icon: 'fa-solid fa-cog',
    // },
  ];

  return (
    <>
      {createPost && <UploadPost closeFunction={setCreatePost} />}
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
          onClick={() => setActiveLink('home')}
        >
          <img src="imgs/logo.svg" alt="logo" width="40" height="40" />
          <span className={clsx('ms-2 fs-2')}>Bygram</span>
        </Link>
        <div className={clsx('h-100 p-3', 'd-flex flex-column justify-content-between')}>
          <ul className={clsx('nav nav-pills', 'flex-column')}>
            {sidebarLinks.map((tag) => {
              return (
                <li key={tag.name} className={clsx('nav-item', 'fs-6')}>
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
                    onClick={(event) => {
                      if (tag.function) {
                        tag.function(event);
                      }
                      if (!tag.notActive) {
                        sessionStorage.setItem('activeLink', tag.name);
                        setActiveLink(tag.name);
                      }
                    }}
                  >
                    <i
                      className={clsx(
                        'nav-link-icon',
                        `${tag.icon}`,
                        'd-inline-block me-3',
                        'fs-5'
                      )}
                    ></i>
                    {tag.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
