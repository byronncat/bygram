import clsx from 'clsx';
import { Overlay } from '@components';
import styles from '@sass/layout/home.module.sass';
import React from 'react';
import { HomePost } from '@pages/home/types';

const defaultAvatar =
  'https://res.cloudinary.com/dq02xgn2g/image/upload/v1709561629/social-media-app/7/jqbxw8xdruxihtkuujbh.jpg';
function WindowView({
  post,
  closeFunction,
}: {
  post: HomePost;
  closeFunction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Overlay closeFunction={closeFunction}>
      <div className={clsx(styles['post-window-wrapper'], 'mh-100 mw-100', 'd-flex')}>
        <div
          className={clsx(
            styles['post-window-image'],
            'h-100',
            'd-flex justify-content-center align-items-center'
          )}
        >
          <img
            src={post.file.dataURL}
            alt="post"
            className={clsx(post.file.sizeType === 'Landscape' ? 'w-100 h-auto' : 'w-auto h-100')}
          />
        </div>
        <div className={clsx(styles['post-window-content'], 'h-100 p-3')}>
          <div className="d-flex align-items-center">
            <span
              className={clsx(
                'd-flex justify-content-center align-items-center',
                'p-0 me-3 rounded-circle',
                'position-relative overflow-hidden'
              )}
              style={{ width: '56px', height: '56px' }}
            >
              <img
                className="w-100 h-auto"
                src={post.avatar ? post.avatar : defaultAvatar}
                alt="profile"
              />
            </span>
            <p className="m-0">{post.username}</p>
          </div>
          <hr />
          <span className={styles['post-info-content']}>{post.content}</span>
        </div>
      </div>
    </Overlay>
  );
}

export default WindowView;
