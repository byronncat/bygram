import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useGlobalContext, useStorageContext, ReactProps } from '@global';
import { searchProfile } from '../services/profile.service';
import { Profile } from '../types';
import styles from '../styles/components/search-side.module.sass';

const defaultAvatar =
  'https://res.cloudinary.com/dq02xgn2g/image/upload/v1709561410/social-media-app/v60ffmwxuqgnku4uvtja.png';
function SearchSide({ className, onExit }: ReactProps) {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([] as Profile[]);
  const { register } = useForm();
  const { authenticationStorage } = useStorageContext();
  const { displayToast } = useGlobalContext();

  function inputHandler(event: any) {
    var lowerCase = event.target.value.toLowerCase();
    setSearchInput(lowerCase);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchInput) {
        // ! searchInput if empty became /api/profile/search match wrong route
        const response = await searchProfile(searchInput);
        if (response.success && response.data) setSearchResult(response.data);
        else displayToast(response.message, 'error');
      }
    }, 1000);
    return () => {
      setSearchResult([]);
      clearTimeout(delayDebounceFn);
    };
  }, [searchInput, displayToast]);

  return (
    <>
      {className && (
        <div
          className={clsx('h-100 w-100', 'position-absolute top-0 start-0 z-1')}
          onClick={() => {
            if (onExit) onExit();
          }}
        />
      )}
      <div
        className={clsx(
          styles['search-wrapper'],
          'h-100 px-4 py-3',
          'd-flex flex-column',
          'float-start',
          'position-absolute top-0 z-2',
          className
        )}
        style={{ background: 'var(--color-black-pearl-07)' }}
        onClick={(event) => event.stopPropagation()}
      >
        <span className={clsx(styles['brand-name'], 'd-block', 'text-capitalize fs-2 fw-bold')}>
          search
        </span>
        <textarea
          className={clsx(styles['search-input'], 'w-100', 'p-2 my-4')}
          placeholder="What's on your mind?"
          spellCheck="false"
          {...register('search')}
          onChange={inputHandler}
        />
        <div className={clsx(styles['result-panel'], 'flex-fill overflow-y-scroll')}>
          {searchResult.map((result: any, index) => {
            if (result.uid === authenticationStorage.user?.id) return null;
            return (
              <Link
                to={`/profile/${result.uid}`}
                key={index}
                className={clsx(
                  styles.link,
                  'd-flex align-items-center',
                  'my-3',
                  'text-capitalize'
                )}
                onClick={() => {
                  localStorage.setItem('activeLink', 'profile');
                  if (onExit) onExit();
                }}
              >
                <span className={clsx(styles['link-avatar'], 'rounded-circle', 'overflow-hidden')}>
                  <img
                    src={result.avatar?.dataURL || defaultAvatar}
                    className={
                      result.avatar?.sizeType === 'landscape' ? 'h-100 w-auto' : 'h-auto w-100'
                    }
                    alt="avatar"
                  />
                </span>
                <p className={clsx('ms-2', 'fs-5')}>{result.username}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SearchSide;
