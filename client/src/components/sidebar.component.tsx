import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useAuth, UploadPost, useGlobal } from '@components';
import styles from '@sass/rootLayout.module.sass';
import axios from 'axios';

function Sidebar() {
  const [activeLink, setActiveLink] = useState(sessionStorage.getItem('activeLink') || 'home');
  const [username, setUsername] = useState('');
  const [minimize, setMinimize] = useState(false);

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
    sessionStorage.removeItem('activeLink');
    navigate('/login');
  }

  const [createPost, setCreatePost] = useState(false);
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
      path: `/${username}`,
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

  const { register } = useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  let inputHandler = (e: any) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase);
  };

  const { displayToast } = useGlobal();
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        // ! searchTarm if empty became /api/profile/search match wrong route
        axios
          .get(`/api/profile/search/${searchTerm}`)
          .then((res) => {
            setSearchResult(res.data.data);
          })
          .catch((error) => {
            displayToast('error', error.response.data.message);
          });
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <>
      {createPost && (
        <UploadPost closeFunction={setCreatePost} api="/api/post/create" method="post" />
      )}
      {minimize && (
        <div
          className="h-100 position-absolute text-white"
          style={{ width: '400px', left: '72px', background: 'var(--color-black-pearl-07)' }}
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
      <nav
        className={clsx(
          styles.sidebar,
          'float-start',
          'h-100',
          minimize ? 'p-3' : 'py-3',
          'd-flex flex-column flex-shrink-0'
        )}
        style={{ width: minimize ? '72px' : '248px' }}
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
          {minimize || <span className={clsx('ms-2 fs-2')}>Bygram</span>}
        </Link>
        <div
          className={clsx(
            'h-100',
            'd-flex flex-column justify-content-between',
            minimize ? '' : 'p-3'
          )}
        >
          <ul className={clsx('nav nav-pills', 'flex-column')}>
            {sidebarLinks.map((tag) => {
              return (
                <li key={tag.name} className={clsx('nav-item', 'fs-6')}>
                  <Link
                    to={tag.path}
                    className={clsx(
                      styles[`sidebar-link`],
                      'nav-link',
                      'p-2 mb-3',
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
                        'd-inline-block',
                        minimize ? '' : 'me-3',
                        'fs-5'
                      )}
                    ></i>
                    {minimize || tag.name}
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
