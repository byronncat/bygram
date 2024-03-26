import { useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { PostUploadWindow, SearchSide } from '@components';
import { useStorageContext } from '@contexts';
import { ReactProps, SidebarLink } from '@types';
import styles from '@styles/component/sidebar.module.sass';
import searchStyles from '@styles/component/search.module.sass';
import effects from '@styles/effects.module.sass';

function Sidebar() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();
  const [minimize, setMinimize] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { setAuthenticationStorage, activeLink, setActiveLink, getActiveLink, handleActiveLink } =
    useStorageContext();

  function logoutHandler(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setAuthenticationStorage({ user: null, isAuthenticated: false });
    localStorage.removeItem('activeLink');
    setActiveLink('home');
    navigate('/login');
  }

  useLayoutEffect(() => {
    setActiveLink(activeLink);
  }, [activeLink, setActiveLink]);

  const sidebarLinks = [
    {
      name: 'home',
      icon: 'fa-solid fa-house',
      path: '/',
    },
    {
      name: 'search',
      icon: 'fa-solid fa-magnifying-glass',
      path: '#',
      onClick: () => {
        searchExitHandler();
        if (activeLink === 'create post') setShowCreatePost(!showCreatePost);
      },
    },
    {
      name: 'explore',
      icon: 'fa-regular fa-compass',
      path: '/explore',
    },
    {
      name: 'create post',
      icon: 'fa-regular fa-square-plus',
      path: '#',
      onClick: () => {
        createPostExitHandler();
        if (activeLink === 'search') {
          setMinimize(!minimize);
          setShowSearch(!showSearch);
        }
      },
    },
    {
      name: 'profile',
      icon: 'fa-solid fa-user',
      path: `/profile/${user.id}`,
    },
    {
      name: 'logout',
      icon: 'fa-solid fa-sign-out-alt',
      path: '/login',
      notActive: true,
      onClick: logoutHandler,
    },
  ] as SidebarLink[];

  function searchExitHandler() {
    setMinimize(!minimize);
    setShowSearch(!showSearch);
  }
  function createPostExitHandler() {
    setShowCreatePost(!showCreatePost);
  }

  return (
    <>
      {showCreatePost && (
        <PostUploadWindow
          onExit={() => {
            createPostExitHandler();
            handleActiveLink(getActiveLink());
          }}
          method="post"
        />
      )}
      <div className={clsx(styles.wrapper, 'h-100', 'float-start', 'd-flex')}>
        <SearchSide
          className={clsx(showSearch && searchStyles['slide-to-right'])}
          onExit={() => {
            searchExitHandler();
            handleActiveLink('profile');
          }}
        />
        <nav
          className={clsx(
            styles.sidebar,
            effects['flicker-one'],
            'h-100',
            'd-flex flex-column',
            activeLink === 'search' && 'z-3',
            minimize && styles.minimize
          )}
        >
          <Brand onClick={() => setActiveLink('home')} />
          <ul className={clsx('d-flex flex-column align-items-center')}>
            {sidebarLinks.map((tag) => {
              return (
                <Link
                  key={tag.name}
                  to={tag.path}
                  className={clsx(
                    styles[`sidebar-link`],
                    'mb-3 rounded-3',
                    activeLink === tag.name && `${styles.active} active`
                  )}
                  onClick={(event) => {
                    if (tag.onClick) {
                      tag.onClick(event);
                    }
                    if (!tag.notActive) {
                      if (activeLink === 'search') searchExitHandler();
                      localStorage.setItem('activeLink', tag.name);
                      handleActiveLink(tag.name);
                    }
                  }}
                >
                  <li
                    className={clsx(
                      styles['link'],
                      'w-100 h-100',
                      'd-flex align-items-center',
                      'text-capitalize'
                    )}
                    aria-current="page"
                  >
                    <i
                      className={clsx(
                        styles['link-icon'],
                        `${tag.icon}`,
                        'h-100',
                        'fs-5 position-relative'
                      )}
                    ></i>
                    <p className={clsx(styles['link-text'], 'ms-3', 'text-nowrap')}>{tag.name}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

function Brand({ onClick }: ReactProps) {
  return (
    <Link
      to="/"
      className={clsx(styles.brand, 'my-5', 'd-flex justify-content-center align-items-center')}
      onClick={onClick}
    >
      <img src="/imgs/logo.svg" className={styles.logo} alt="logo" />
      <span className={clsx(styles['brand-name'], 'ms-2', 'fs-2 fw-bold')}>Bygram</span>
    </Link>
  );
}

export default Sidebar;
