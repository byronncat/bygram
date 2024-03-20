import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Menu, Overlay, PostWindow } from '@components';
import { useGlobalContext, useStorageContext } from '@contexts';
import { useFormat } from '@hooks';
import { HomePost } from '@pages/home/types';
import styles from '@styles/layout/home.module.sass';
import { deletePost } from '@services';

const defaultAvatar =
  'https://res.cloudinary.com/dq02xgn2g/image/upload/v1709561410/social-media-app/v60ffmwxuqgnku4uvtja.png';
function PostsVerticalView({ posts }: { posts: HomePost[] }) {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showCurrentPost, setShowCurrentPost] = useState(false);
  const [currentPost, setCurrentPost] = useState({} as HomePost);
  const { authenticationStorage } = useStorageContext();
  const { displayToast } = useGlobalContext();
  const { formatTime } = useFormat();

  const authorPostMenu = [
    {
      name: 'Delete post',
      function: async () => {
        setShowActionMenu(false);
        const success = await deletePost(currentPost.id!);
        if (success) {
          displayToast('Post deleted', 'success');
        } else {
          displayToast('Post not deleted, Something! wrong', 'error');
        }
      },
    },
    {
      name: 'Edit',
      // function: (post: any) => editPost(post),
    },
    {
      name: 'Cancel',
      function: () => setShowActionMenu(false),
    },
  ];

  const followPostMenu = [
    {
      name: 'Go to post',
      // function: (post: any) => followPost(post),
    },
    {
      name: 'About this account',
      // function: (post: any) => followPost(post),
    },
    {
      name: 'Cancel',
      function: () => setShowActionMenu(false),
    },
  ];

  return (
    <>
      {showActionMenu && (
        <Overlay onExit={setShowActionMenu}>
          <Menu
            list={
              authenticationStorage.user!.id === currentPost.uid ? authorPostMenu : followPostMenu
            }
          />
        </Overlay>
      )}
      {showCurrentPost && <PostWindow post={currentPost} onExit={setShowCurrentPost} />}

      <section className={styles['posts-wrapper']}>
        {posts.map((post: HomePost, index: number) => {
          return (
            <div className={clsx(styles.post, 'w-100 my-5 position-relative')} key={index}>
              <span
                className={clsx('position-absolute top-0 end-0', 'p-3', 'fs-3', 'pe-auto')}
                role="button"
                onClick={() => {
                  setShowActionMenu(true);
                  setCurrentPost(post);
                }}
              >
                <i className="fa-solid fa-ellipsis"></i>
              </span>
              <header className="d-flex">
                <span
                  className={clsx(
                    styles.avatar,
                    'd-block me-3 rounded-circle',
                    'position-relative',
                    'overflow-hidden'
                  )}
                >
                  <img
                    className={clsx(
                      post.avatar?.sizeType === 'Landscape' ? 'w-auto h-100' : 'w-100 h-auto'
                    )}
                    alt="profile"
                    src={'avatar' in post ? post.avatar!.dataURL : defaultAvatar}
                  />
                </span>
                <span className="d-flex align-items-center">
                  <p className={clsx('d-block', 'fw-bolder')}>{post.username}</p>
                  <span className="mx-2 fw-bold">&middot;</span>
                  <p className={clsx(styles['date-time'], 'd-block')}>
                    {formatTime(post.createdAt!)}
                  </p>
                </span>
              </header>
              <div
                className={clsx(styles['post-image'], 'my-3')}
                onClick={() => {
                  setCurrentPost(post);
                  setShowCurrentPost(true);
                }}
              >
                <img className="img-fluid" alt="profile" src={post.file.dataURL} />
              </div>
              {/* <div className="post-info">
                <div className="Buttons">
                  <span className="button comments">
                    <i className="fa-solid fa-comment"></i> 2
                  </span>
                  <span className="button reposts">
                    <i className="fa-solid fa-share-from-square"></i> 47
                  </span>
                  <span className="button likes">
                    <i className="fas fa-heart"></i> 190
                  </span>
                  <span className="button message">
                    <i className="fa-solid fa-heart"></i> 12
                  </span>
                </div>
                <p className="">View comment</p>
                <p className="Text">Comment ...</p>
              </div> */}
              <main className={clsx('position-relative')}>
                <Link
                  className={clsx(styles['ribbon'], 'd-flex align-items-center', 'fw-bold')}
                  to={
                    `/profile/${post.uid}` +
                    (post.uid !== authenticationStorage.user?.id
                      ? `?ruid=${authenticationStorage.user?.id}`
                      : '')
                  }
                >
                  <span className={styles['content-username']}>{post.username}</span>
                </Link>
                <p className={clsx(styles['post-content'], 'd-block')}>{post.content}</p>
              </main>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default PostsVerticalView;
