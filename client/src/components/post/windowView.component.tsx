import { useState } from 'react';
import clsx from 'clsx';
import { Overlay } from '@components';
import styles from '@sass/home.module.sass';

const defaultAvatar =
  'https://res.cloudinary.com/dq02xgn2g/image/upload/v1709561629/social-media-app/7/jqbxw8xdruxihtkuujbh.jpg';
function WindowView({
  post,
  showPost,
  setShowPost,
}: {
  post: any;
  showPost: boolean;
  setShowPost: any;
}) {
  return showPost ? (
    <Overlay closeFunction={setShowPost}>
      <div
        className={clsx(styles['post-display-wrapper'], 'd-flex mw-100')}
        style={{ maxHeight: '100%', height: '900px' }}
      >
        <img src={post.imgURL} alt="post-image" className="h-100 w-auto" />
        <div className="h-100 p-3" style={{ width: '500px' }}>
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
            <p className="m-0">{post.name}</p>
          </div>
          <hr />
          <span className={styles['post-info-content']}>{post.content}</span>
        </div>
      </div>
    </Overlay>
  ) : (
    <></>
  );
}

export default WindowView;
