import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

// import { toast, useDebounce, ReactProps } from '@global';
import { searchAPI } from '../api';
import { useSidebarOptionsContext } from '../providers';
import { SIDEBAR_OPTION, DEFAULT } from '../constants';
import type { SearchProfileData } from '../types';
import type { ReactProps } from '@global';
import { useAuthenticationContext } from '@/modules/authentication';

interface SearchSideProps extends ReactProps {
  isShow: boolean;
  exitHandler: () => void;
}

const DEBOUNCE_TIME = 1000;
const SearchElement = document.getElementById('search') as HTMLInputElement;

function SearchSide({ isShow, exitHandler }: SearchSideProps) {
  const { setOption } = useSidebarOptionsContext();
  const { user } = useAuthenticationContext();
  const { register } = useForm();
  // const [debouncedSearchInput, setSearchInput] = useDebounce<string>(
  //   '',
  //   DEBOUNCE_TIME,
  // );
  const [searchResult, setSearchResult] = useState([] as SearchProfileData[]);

  function navigateProfileHandler() {
    setOption(SIDEBAR_OPTION.PROFILE);
    exitHandler();
  }

  function inputHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    var lowerCase = event.target.value.toLowerCase();
    // setSearchInput(lowerCase);
  }
  const eraseSearch = useCallback(() => {
    if (SearchElement) SearchElement.value = '';
  }, []);
  const focusSearch = useCallback(() => {
    if (SearchElement) SearchElement.focus();
  }, []);

  useEffect(() => {
    if (isShow) focusSearch();
    else eraseSearch();
  }, [isShow, eraseSearch, focusSearch]);

  // useEffect(() => {
  //   // ! searchInput if empty became /api/profile/search match wrong route
  //   if (debouncedSearchInput) {
  //     (async function search() {
  //       const response = await searchAPI(debouncedSearchInput);
  //       if (response.success) setSearchResult(response.data || []);
  //     })();
  //   }
  // }, [debouncedSearchInput]);

  return (
    <>
      {isShow && (
        <span
          className={clsx('h-screen w-screen', 'absolute top-0 start-0 -z-10')}
          onClick={exitHandler}
        />
      )}
      <div
        className={clsx(
          'flex flex-col',
          'absolute top-0 bg-white/[.08]',
          'transition-all ease-in duration-300',
          'border-r border-white/[.1]',
          isShow
            ? 'start-20 translate-x-0 opacity-100'
            : 'start-0 -translate-x-full opacity-0',
          'h-full w-100 px-4 pt-10 pb-3',
        )}
      >
        <span
          className={clsx(
            'flex items-center h-12',
            'font-semibold text-2xl capitalize tracking-wide',
          )}
        >
          search
        </span>
        <textarea
          id="search"
          className={clsx(
            'p-2 my-4',
            'w-full bg-white/[.1]',
            'resize-none outline-none',
            'duration-300 opacity-50 hover:opacity-100 focus:opacity-100',
          )}
          rows={1}
          placeholder="What's on your mind?"
          spellCheck="false"
          {...register('search')}
          onChange={inputHandler}
        />
        <div className={clsx('grow overflow-y-scroll')}>
          {searchResult.map((result) => {
            if (result.id === user?.id) return null;
            return (
              <Link
                to={`/profile/${result.username}`}
                key={result.id}
                className={clsx(
                  'flex items-center',
                  'my-3',
                  'transition-all duration-300',
                  'opacity-50 hover:opacity-100',
                )}
                onClick={navigateProfileHandler}
              >
                <span
                  className={clsx(
                    'block h-10 w-10',
                    'rounded-full',
                    'overflow-hidden',
                  )}
                >
                  <img
                    src={result.avatar?.url || DEFAULT.AVATAR}
                    className={
                      result.avatar?.orientation === 'landscape'
                        ? 'h-full w-auto'
                        : 'h-auto w-full'
                    }
                    alt="avatar"
                  />
                </span>
                <p className="ms-3 text-lg">{result.username}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SearchSide;
