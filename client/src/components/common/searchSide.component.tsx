import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import axios from 'axios';
import { useGlobalContext, useStorageContext } from '@contexts';
import { ReactProps } from '@types';
import styles from '@styles/component/search.module.sass';

function SearchSide({ className, onExit }: ReactProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const { register } = useForm();
  const { authenticationStorage } = useStorageContext();
  const { displayToast } = useGlobalContext();

  function inputHandler(event: any) {
    var lowerCase = event.target.value.toLowerCase();
    setSearchTerm(lowerCase);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        // ! searchTarm if empty became /api/profile/search match wrong route
        axios
          .get(`/api/profile/search/${searchTerm}`)
          .then((res) => {
            console.log(res.data.data);
            setSearchResult(res.data.data);
          })
          .catch((error: any) => {
            displayToast('error', error.response.data.message);
          });
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, displayToast]);

  return (
    <>
      <div
        className={clsx(
          styles['search-wrapper'],
          'h-100 px-4 py-3',
          'float-start',
          'position-absolute top-0 z-2',
          className
        )}
        style={{ background: 'var(--color-black-pearl-07)' }}
      >
        <textarea
          className={clsx(styles['search-input'], 'w-100', 'border-0', 'p-2', 'rounded-3')}
          placeholder="What's on your mind?"
          {...register('search')}
          onChange={inputHandler}
        ></textarea>
        {searchResult.map((result: any) => {
          return (
            <Link
              to={
                `/profile/${result.uid}` +
                (result.uid !== result.user?.id ? `?ruid=${authenticationStorage.user?.id}` : '')
              }
              key={result.uid}
              className={clsx('d-block', 'text-reset', 'text-capitalize')}
              onClick={() => {
                localStorage.setItem('activeLink', 'profile');
                if (onExit) onExit();
              }}
            >
              <div className="d-flex align-items-center">
                <span className={clsx(styles['link-avatar'], 'rounded-circle', 'overflow-hidden')}>
                  <img
                    src={result.avatar.dataURL}
                    className={
                      result.avatar.sizeType === 'Landscape' ? 'h-100 w-auto' : 'h-auto w-100'
                    }
                    alt="avatar"
                  />
                </span>
                <span className={clsx('ms-2', 'fs-5')}>{result.username}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default SearchSide;
