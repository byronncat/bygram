import { cloneElement } from 'react';
import { Link } from 'react-router-dom';
import { useToggle } from 'usehooks-ts';
import clsx from 'clsx';

import { toast } from '@global';
import { authenticationApi, useAuthenticationContext } from '@authentication';
import { UploadWindow } from './post/upload';
import { useSidebarOptionsContext } from '../providers';
import { SearchSide } from './';
import {
  CompassIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  RightFromBracketIcon,
  SquarePlusIcon,
  UserIcon,
} from '@assets/icons';

import { SIDEBAR_OPTION, SidebarOptionStrings } from '../constants';

interface SidebarLink {
  name: SidebarOptionStrings;
  icon: JSX.Element;
  path: string;
}

const Sidebar = () => {
  const [minimize, toggleMinimize] = useToggle(false);
  const [showSearch, toggleShowSearch] = useToggle(false);
  const [showCreate, toggleShowCreate] = useToggle(false);

  const { logout, user } = useAuthenticationContext();
  const { option, setOption, optionBack } = useSidebarOptionsContext();

  function toggleSearchHandler() {
    toggleMinimize();
    toggleShowSearch();
  }
  function selectOptionHandler(clickedOption: SidebarOptionStrings) {
    if (clickedOption === SIDEBAR_OPTION.LOGOUT) return logoutHandler();
    if (clickedOption === SIDEBAR_OPTION.CREATE) return toggleShowCreate();
    if (clickedOption === SIDEBAR_OPTION.SEARCH) toggleSearchHandler();
    if (option === SIDEBAR_OPTION.SEARCH) {
      if (clickedOption === SIDEBAR_OPTION.SEARCH) return optionBack();
      else toggleSearchHandler();
    }
    if (clickedOption === option) return;
    return setOption(clickedOption);
  }

  const logoutHandler = async () => {
    toast.loading('Logging out...');
    const response = await authenticationApi.logout();
    if (response.success) {
      logout();
      toast.success(response.message);
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
        <UploadWindow exitHandler={toggleShowCreate} method="post" />
      )}
      <div className={clsx('w-120 h-full', 'relative')}>
        <SearchSide isShow={showSearch} exitHandler={toggleSearchHandler} />
        <nav
          className={clsx(
            'h-full pt-8',
            'dark:bg-surface/[.07]',
            'border-r border-on-surface/[.12] dark:border-dark-on-surface/[.1]',
            'transition-all duration-300',
            minimize ? `w-20` : 'w-64 px-6',
          )}
        >
          <ul className={clsx('flex flex-col', minimize && 'items-center')}>
            {SIDEBAR_MENU.map((tag) => {
              return (
                <li
                  key={tag.name}
                  className={clsx('mb-3 h-12 ', minimize ? 'w-12' : 'w-full')}
                  aria-current="page"
                >
                  <Link
                    id={tag.name}
                    to={tag.path}
                    className={clsx(
                      'group',
                      'w-full h-full px-3 rounded-lg',
                      'flex items-center',
                      'capitalize',
                      'transition-all duration-300',
                      minimize ? 'justify-center w-12' : 'w-48',
                      option === tag.name
                        ? clsx(
                            'bg-primary text-on-primary',
                            'dark:bg-dark-primary/[.7]',
                            'font-semibold tracking-wider',
                          )
                        : clsx(
                            'text-on-surface/[0.87] hover:text-surface',
                            'dark:text-dark-on-surface/[0.87] dark:hover:text-surface',
                            'hover:bg-primary/[.5] active:text-surface active:bg-primary/[.7]',
                            'dark:hover:bg-dark-primary/[.3] dark:active:text-surface dark:active:bg-dark-primary/[.5]',
                          ),
                    )}
                    onClick={() => selectOptionHandler(tag.name)}
                  >
                    {cloneElement(tag.icon, {
                      className: clsx(
                        'w-5 h-5',
                        'transition-all duration-300',
                        option === tag.name
                          ? 'fill-on-primary'
                          : clsx(
                              'fill-on-surface/[0.87] group-hover:fill-surface group-active:fill-surface group-active:scale-95',
                              'dark:fill-dark-on-surface/[0.87] dark:group-hover:fill-dark-surface dark:group-active:fill-dark-surface dark:group-active:scale-95',
                            ),
                      ),
                    })}
                    <p
                      className={clsx(
                        'ms-3',
                        'whitespace-nowrap',
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
};

export default Sidebar;
