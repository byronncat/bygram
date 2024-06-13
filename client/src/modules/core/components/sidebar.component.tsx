import { cloneElement, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import clsx from 'clsx';

import { toast } from '@global';
import { logoutAPI, useAuthenticationContext } from '@authentication';
import { useSidebarOptionsContext } from '../providers';
import { SearchSide, UploadPostWindow } from './';
import {
  CompassIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  RightFromBracketIcon,
  SquarePlusIcon,
  UserIcon,
} from '@assets/icons';

import { SIDEBAR_OPTION, SidebarOptionStrings } from '../constants';
import styles from '../styles/components/sidebar.module.sass';
import logoURL from '@assets/images/logo.svg';

interface SidebarLink {
  name: SidebarOptionStrings;
  icon: JSX.Element;
  path: string;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const [minimize, setMinimize] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const { currentLink, setLink, setBackToPreviousLink } =
    useSidebarOptionsContext();
  const { setAuthenticatedState, user } = useAuthenticationContext();

  async function logoutHandler() {
    const response = await logoutAPI();
    // toast.display(response.message, response.success ? 'success' : 'error');
    if (response.success) {
      setAuthenticatedState(false);
      navigate('/login');
    }
    // toast.display(response.message, response.success ? 'success' : 'error');
  }

  const SIDEBAR_MENU = [
    {
      name: SIDEBAR_OPTION.HOME,
      icon: <HouseIcon color="white" />,
      path: '/',
    },
    {
      name: SIDEBAR_OPTION.SEARCH,
      icon: <MagnifyingGlassIcon color="white" />,
      path: '#',
    },
    {
      name: SIDEBAR_OPTION.EXPLORE,
      icon: <CompassIcon color="white" />,
      path: '/explore',
    },
    {
      name: SIDEBAR_OPTION.CREATE,
      icon: <SquarePlusIcon color="white" />,
      path: '#',
    },
    {
      name: SIDEBAR_OPTION.PROFILE,
      icon: <UserIcon color="white" />,
      path: `/profile/${user?.username}`,
    },
    {
      name: SIDEBAR_OPTION.LOGOUT,
      icon: <RightFromBracketIcon color="white" />,
      path: '/login',
    },
  ] as SidebarLink[];

  function toggleSearchHandler() {
    setMinimize(!minimize);
    setShowSearch(!showSearch);
  }
  function toggleCreateHandler() {
    setShowCreate(!showCreate);
  }

  function selectOptionHandler(option: SidebarOptionStrings) {
    if (option === SIDEBAR_OPTION.LOGOUT) return logoutHandler();
    if (option === SIDEBAR_OPTION.CREATE) return toggleCreateHandler();
    if (option === SIDEBAR_OPTION.SEARCH) toggleSearchHandler();
    if (currentLink === SIDEBAR_OPTION.SEARCH) {
      if (showSearch) toggleSearchHandler();
      if (option === SIDEBAR_OPTION.SEARCH) setBackToPreviousLink();
    }
    if (option === currentLink) return;
    return setLink(option);
  }

  return (
    <>
      {showCreate && (
        <UploadPostWindow exitHandler={toggleCreateHandler} method="post" />
      )}
      <div className={clsx('w-120 h-full', 'relative z-10')}>
        <SearchSide isShow={showSearch} exitHandler={toggleSearchHandler} />
        <nav
          className={clsx(
            'relative z-10',
            'h-full bg-white/[.08]',
            'transition-all duration-300',
            'border-r border-white/[.1]',
            minimize ? `w-20` : 'w-64 px-6',
          )}
        >
          <Link
            to="/"
            className={clsx(
              styles.brand,
              'h-36',
              'flex items-center',
              minimize && 'justify-center',
            )}
            onClick={() => setLink('home')}
          >
            <img
              src={logoURL}
              className={clsx('w-12 h-12', minimize ? 'block' : 'hidden')}
              alt="logo"
            />
            <span
              className={clsx(
                styles['brand-name'],
                'font-oleo-script text-4xl tracking-wider',
                'transition-all duration-700',
                minimize ? 'hidden' : 'block',
              )}
            >
              Bygram
            </span>
          </Link>

          <ul className={clsx('flex flex-col', minimize && 'items-center')}>
            {SIDEBAR_MENU.map((tag) => {
              return (
                <li
                  key={tag.name}
                  className={clsx(
                    'group',
                    'mb-3 h-12 ',
                    'transition-all duration-300',
                    minimize ? 'w-12' : 'w-full',
                  )}
                  aria-current="page"
                >
                  <Link
                    id={tag.name}
                    to={tag.path}
                    className={clsx(
                      'w-full h-full px-2 rounded',
                      'flex items-center',
                      'capitalize',
                      minimize ? 'justify-center w-12' : 'w-48',
                      currentLink === tag.name
                        ? `${styles.active} bg-cerise-700 font-semibold tracking-wider`
                        : 'text-white/[.62] hover:text-white hover:bg-cerise-700/[.4] active:text-white/[.4] active:bg-cerise-700/[.3]',
                    )}
                    onClick={() => selectOptionHandler(tag.name)}
                  >
                    {cloneElement(tag.icon, {
                      className: clsx(
                        'w-5 h-5',
                        'transition-all duration-300',
                        currentLink === tag.name
                          ? 'fill-white'
                          : 'fill-white/[.62] group-hover:fill-white group-active:fill-white/[.4] group-active:scale-95',
                      ),
                    })}
                    <p
                      className={clsx(
                        'ms-3',
                        'whitespace-nowrap',
                        'transition-all duration-300',
                        minimize ? 'hidden' : 'block',
                      )}
                    >
                      {tag.name}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
