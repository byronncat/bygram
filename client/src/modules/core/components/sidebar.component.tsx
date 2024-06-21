import { cloneElement } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToggle } from 'usehooks-ts';
import clsx from 'clsx';

import { toast } from '@global';
import { authenticationApi, useAuthenticationContext } from '@authentication';
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
  const [minimize, toggleMinimize] = useToggle(false);
  const [showSearch, toggleShowSearch] = useToggle(false);
  const [showCreate, toggleShowCreate] = useToggle(false);

  const { logout, user } = useAuthenticationContext();
  const { option, setOption, optionBack } = useSidebarOptionsContext();

  function toggleSearchHandler() {
    toggleMinimize();
    toggleShowSearch();
  }
  function selectOptionHandler(_option: SidebarOptionStrings) {
    if (_option === SIDEBAR_OPTION.LOGOUT) return logoutHandler();
    if (_option === SIDEBAR_OPTION.CREATE) return toggleShowCreate();
    if (_option === SIDEBAR_OPTION.SEARCH) toggleSearchHandler();
    if (option === SIDEBAR_OPTION.SEARCH) {
      if (showSearch) toggleSearchHandler();
      return optionBack();
    }
    if (_option === option) return;
    return setOption(_option);
  }

  const logoutHandler = async () => {
    toast.loading('Logging out...');
    const response = await authenticationApi.logout();
    if (response.success) {
      toast.success(response.message);
      logout();
      navigate('/login');
    } else {
      toast.error(response.message);
    }
  };

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

  return (
    <>
      {showCreate && (
        <UploadPostWindow exitHandler={toggleShowCreate} method="post" />
      )}
      <div className={clsx('w-120 h-full', 'relative z-10')}>
        <SearchSide isShow={showSearch} exitHandler={toggleSearchHandler} />
        <nav
          className={clsx(
            'relative z-10',
            'h-full bg-background/[.08]',
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
            onClick={() => setOption('home')}
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
                      option === tag.name
                        ? `${styles.active} bg-cerise-700 font-semibold tracking-wider`
                        : 'text-white/[.62] hover:text-white hover:bg-cerise-700/[.4] active:text-white/[.4] active:bg-cerise-700/[.3]',
                    )}
                    onClick={() => selectOptionHandler(tag.name)}
                  >
                    {cloneElement(tag.icon, {
                      className: clsx(
                        'w-5 h-5',
                        'transition-all duration-300',
                        option === tag.name
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
