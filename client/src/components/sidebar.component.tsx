import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import clsx from 'clsx';
import { useAuth, PostUploadWindow, useGlobal } from '@components';
import styles from '@sass/component/sidebar.module.sass';

function Sidebar() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(sessionStorage.getItem('activeLink') || 'home');
  const [minimize, setMinimize] = useState(false);

  const [createPost, setCreatePost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const { register } = useForm();
  const { displayToast } = useGlobal();
  const { setAuthenticationStorage } = useAuth();

  function logoutHandler(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setAuthenticationStorage({ user: null, isAuthenticated: false });
    sessionStorage.removeItem('activeLink');
    navigate('/login');
  }

  function inputHandler(event: any) {
    var lowerCase = event.target.value.toLowerCase();
    setSearchTerm(lowerCase);
  }

  useLayoutEffect(() => {
    setActiveLink(activeLink);
  }, [activeLink]);

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
      function: () => {
        setMinimize(!minimize);
      },
    },
    {
      name: 'explore',
      icon: 'fa-regular fa-compass',
      path: '/explore',
    },
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
      path: `/${user.username}/${user.id}`,
    },
    {
      name: 'logout',
      icon: 'fa-solid fa-sign-out-alt',
      path: '/login',
      notActive: true,
      function: logoutHandler,
    },
    // {
    //   name: 'settings',
    //   icon: 'fa-solid fa-cog',
    // },
  ];
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        // ! searchTarm if empty became /api/profile/search match wrong route
        axios
          .get(`/api/profile/search/${searchTerm}`)
          .then((res) => {
            setSearchResult(res.data.data);
          })
          .catch((error: any) => {
            displayToast('error', error.response.data.message);
          });
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, displayToast]);

  return (
    <>
      {createPost && (
        <PostUploadWindow closeFunction={setCreatePost} api="/api/post/create" method="post" />
      )}
      <nav
        className={clsx(
          styles.sidebar,
          'float-start',
          'h-100',
          'd-flex flex-column',
          minimize && styles.minimize
        )}
      >
        <Link
          to="/"
          className={clsx(styles.brand, 'my-5', 'd-flex justify-content-center align-items-center')}
          onClick={() => setActiveLink('home')}
        >
          <img src="imgs/logo.svg" className={styles.logo} alt="logo" />
          <span className={clsx(styles['brand-name'], 'ms-2', 'fs-2 fw-bold')}>Bygram</span>
        </Link>
        <ul className={clsx('d-flex flex-column align-items-center')}>
          {sidebarLinks.map((tag) => {
            return (
              <li
                key={tag.name}
                className={clsx(
                  styles[`sidebar-link`],
                  'mb-3 rounded-3',
                  activeLink === tag.name ? `${styles.active} active` : ''
                )}
              >
                <Link
                  to={tag.path}
                  className={clsx(
                    styles['link'],
                    'w-100 h-100',
                    'd-flex align-items-center',
                    'text-capitalize'
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
                      styles['link-icon'],
                      `${tag.icon}`,
                      'h-100',
                      'fs-5 position-relative'
                    )}
                  />
                  <p className={clsx(styles['link-text'], 'ms-3', 'text-nowrap')}>{tag.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {minimize && (
        <div
          className="h-100 text-white float-start"
          style={{ width: '400px', background: 'var(--color-black-pearl-07)' }}
        >
          <textarea
            className="w-100"
            placeholder="What's on your mind?"
            {...register('search')}
            onChange={inputHandler}
          ></textarea>
          {searchResult.map((result: any) => {
            return (
              <Link
                to={`/${result.name}`}
                key={result.uid}
                className={clsx('d-block', 'text-reset', 'text-capitalize')}
                onClick={() => {
                  setMinimize(true);
                  sessionStorage.setItem('activeLink', 'profile');
                  setActiveLink('profile');
                }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={result.avatar}
                    alt="avatar"
                    width="40"
                    height="40"
                    className="rounded-circle"
                  />
                  <span className={clsx('ms-2', 'fs-5')}>{result.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Sidebar;
