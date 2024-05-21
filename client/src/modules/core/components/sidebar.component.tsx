import { cloneElement, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import clsx from 'clsx';

import { useSidebarOptionsContext } from '../providers';
import UploadPostWindow from './upload-post-window.component';
// import SearchSide from './search-side.component';
import { SidebarLink } from '../types/layout.d';

import styles from '../styles/components/sidebar.module.sass';
// import searchStyles from '../styles/components/search-side.module.sass';
import logoURL from '@assets/images/logo.svg';

import type { ReactProps } from '@global';
import {
  CompassIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  RightFromBracketIcon,
  SquarePlusIcon,
  UserIcon,
} from './icons';
import { SIDEBAR_OPTION, SidebarOptionStrings } from '../constants';
import { logoutAPI } from '@/modules/authentication/api';
import { useAuthenticationContext } from '@/modules/authentication';

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const navigate = useNavigate();
  const [minimize, setMinimize] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { currentLink, setLink } = useSidebarOptionsContext();
  const { setAuthenticatedState } = useAuthenticationContext();

  async function logoutHandler() {
    localStorage.removeItem('session_id');
    localStorage.removeItem('active_link');
    const response = await logoutAPI();
    setAuthenticatedState(false);
    console.log(response);
    if (response.success) navigate('/login');
    navigate('/login');
  }

  const sidebarLinks = [
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
      // onClick: () => {
      //   if (currentLink === 'search') {
      //     setMinimize(!minimize);
      //     setShowSearch(!showSearch);
      //   }
      // },
    },
    {
      name: SIDEBAR_OPTION.PROFILE,
      icon: <UserIcon color="white" />,
      path: `/profile/${user.id}`,
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
  function togglePostHandler() {
    setShowCreatePost(!showCreatePost);
  }

  function selectOptionHandler(option: SidebarOptionStrings) {
    if (option === SIDEBAR_OPTION.LOGOUT) return logoutHandler();
    if (option === currentLink) return;
    if (option === SIDEBAR_OPTION.SEARCH) toggleSearchHandler();
    if (option === SIDEBAR_OPTION.CREATE) togglePostHandler();
    if (
      minimize &&
      !SIDEBAR_OPTION.CANNOT_ACTIVATED.find((index) => index === option)
    )
      setMinimize(false);
    setLink(option);
  }

  return (
    <>
      {showCreatePost && <UploadPostWindow onExit={() => {}} method="post" />}
      {/* <SearchSide
          className={clsx(showSearch && searchStyles['slide-to-right'])}
          onExit={() => {
            searchExitHandler();
            activeLinkHandler('profile');
          }}
        /> */}
      <nav
        className={clsx(
          'h-full bg-white/[.08]',
          'd-flex flex-column',
          'transition-all duration-300',
          minimize ? `w-20` : 'w-64',
        )}
      >
        <Brand onClick={() => setLink('home')} isMinimize={minimize} />
        <ul className={clsx('flex flex-col items-center')}>
          {sidebarLinks.map((tag) => {
            return (
              <li
                key={tag.name}
                className={clsx(
                  'group',
                  'mb-3 h-12 ',
                  'transition-all duration-300',
                  minimize ? 'w-12' : 'w-48',
                )}
                aria-current="page"
              >
                <Link
                  id={tag.name}
                  to={tag.path}
                  className={clsx(
                    'w-full h-full py-2 rounded',
                    'flex items-center',
                    'capitalize',
                    minimize ? 'justify-center w-12 px-2' : 'w-48 ps-6',
                    currentLink === tag.name
                      ? `${styles.active} bg-cerise-700 font-semibold tracking-wider`
                      : 'text-white/[.6] hover:text-white hover:bg-cerise-700/[.4]',
                  )}
                  onClick={() => selectOptionHandler(tag.name)}
                >
                  {cloneElement(tag.icon, {
                    className: clsx(
                      'w-5 h-5',
                      'transition-all duration-300',
                      currentLink === tag.name
                        ? 'fill-white'
                        : 'fill-white/[.6] group-hover:fill-white',
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
    </>
  );
}

interface BrandProps extends ReactProps {
  isMinimize?: boolean;
}
function Brand({ onClick, isMinimize }: BrandProps) {
  return (
    <Link
      to="/"
      className={clsx(
        styles.brand,
        'my-10',
        'flex justify-center items-center',
      )}
      onClick={onClick}
    >
      <img src={logoURL} className="w-12 h-12" alt="logo" />
      {
        <span
          className={clsx(
            styles['brand-name'],
            'ms-2',
            'font-semibold text-2xl tracking-wider',
            'transition-all duration-700',
            isMinimize ? 'hidden' : 'block',
          )}
        >
          Bygram
        </span>
      }
    </Link>
  );
}
