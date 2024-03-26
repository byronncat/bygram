import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Loading, Overlay, Menu, PostWindow, PostUploadWindow } from '@components';
import { useStorageContext, useGlobalContext } from '@contexts';
import { useFormat } from '@hooks';
import { getHomePosts, likePost, sendComment } from '@services';
import { authorPostMenu, followPostMenu } from '../../constants';
import { PostData } from '@types';
import styles from '@styles/layout/home.module.sass';
import windowViewStyles from '@styles/post/window.module.sass';

const defaultAvatar =
  'https://res.cloudinary.com/dq02xgn2g/image/upload/v1709561410/social-media-app/v60ffmwxuqgnku4uvtja.png';

function HomePage() {
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState([] as PostData[]);
  const [currentPost, setCurrentPost] = useState({} as PostData);
  const [showCurrentPost, setShowCurrentPost] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const { displayToast, refresh, setRefresh } = useGlobalContext();
  const { authenticationStorage, handleActiveLink } = useStorageContext();
  const { formatTime } = useFormat();

  const authorMenu = authorPostMenu.map((item) => {
    switch (item.name) {
      case 'Delete post': {
        item.functionHandler = async () => {
          setShowActionMenu(false);
          const response = await item.function!(currentPost.id);
          setRefresh(!refresh);
          displayToast(response.message, response.success ? 'success' : 'error');
        };
        break;
      }
      case 'Edit': {
        item.functionHandler = () => {
          setShowActionMenu(false);
          setShowCreatePost(true);
        };
        break;
      }
    }
    return item;
  });
  authorMenu.push({
    name: 'Cancel',
    functionHandler: () => {
      setShowActionMenu(false);
    },
  });

  const onComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const commentValue = (event.target as HTMLFormElement).comment.value;
    if (!commentValue) return displayToast('Comment cannot be empty', 'error');
    const response = await sendComment(
      authenticationStorage.user!.id,
      currentPost.id,
      commentValue
    );
    if (response.success) {
      setRefresh(!refresh);
      displayToast(response.message, 'success');
    }
  };

  useEffect(() => {
    (async function fetchPosts() {
      const response = await getHomePosts(authenticationStorage.user?.id!);
      if (response.success && response.data) {
        setPosts(response.data);
        setReady(true);
      } else displayToast(response.message, 'error');
    })();
  }, [authenticationStorage, displayToast, refresh]);

  if (!ready) return <Loading />;
  return (
    <>
      {showActionMenu && (
        <Overlay onExit={() => setShowActionMenu(false)}>
          <Menu
            list={
              (authenticationStorage.user!.id === currentPost.uid && authorMenu) || followPostMenu
            }
          />
        </Overlay>
      )}
      {showCreatePost && (
        <PostUploadWindow
          defaultPost={currentPost}
          onExit={() => {
            setShowCreatePost(false);
            setShowActionMenu(false);
          }}
          method="put"
        />
      )}
      {showCurrentPost && (
        <PostWindow post={currentPost} onExit={() => setShowCurrentPost(false)} />
      )}
      <section className={styles['posts-wrapper']}>
        {posts.map((post: PostData) => {
          return (
            <div className={clsx(styles.post, 'w-100 my-5 position-relative')} key={post.id}>
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
                      post.avatar?.sizeType === 'landscape' ? 'w-auto h-100' : 'w-100 h-auto'
                    )}
                    alt="profile"
                    src={'avatar' in post ? post.avatar!.dataURL : defaultAvatar}
                  />
                </span>
                <div className="d-flex align-items-center">
                  <Link
                    className={clsx(styles.username, 'd-block', 'fw-bolder')}
                    to={`/profile/${post.uid}`}
                    onClick={() => handleActiveLink('profile')}
                  >
                    {post.username}
                  </Link>
                  <span className="mx-2 fw-bold">&middot;</span>
                  <p className={clsx(styles['date-time'], 'd-block')}>
                    {formatTime(post.createdAt!)}
                  </p>
                </div>
              </header>
              <div
                className={clsx(
                  post.file.sizeType === 'portrait' && styles['post-image'],
                  styles['negative-margin'],
                  'my-3',
                  'd-flex justify-content-center align-items-center'
                )}
                onClick={() => {
                  setCurrentPost(post);
                  setShowCurrentPost(true);
                }}
              >
                <img
                  className={post.file.sizeType === 'landscape' ? 'img-fluid' : 'h-100 w-auto'}
                  alt="profile"
                  src={post.file.dataURL}
                />
              </div>
              <main className={clsx('position-relative')}>
                <Link
                  className={clsx(styles['content-username'], 'd-inline-block p-2 mb-3', 'fw-bold')}
                  to={`/profile/${post.uid}`}
                  onClick={() => handleActiveLink('profile')}
                >
                  {post.username}
                </Link>
                <div className={clsx('d-flex align-items-center')}>
                  <span className={clsx(styles.icons, 'd-flex align-items-center', 'fs-4')}>
                    <i
                      onClick={async () => {
                        const response = await likePost(authenticationStorage.user!.id, post.id);
                        if (response.success) setRefresh(!refresh);
                      }}
                      className={clsx(
                        styles['likes-icon'],
                        `fa-${
                          post.likes?.includes(authenticationStorage.user?.id!)
                            ? 'solid'
                            : 'regular'
                        } fa-heart`
                      )}
                    />
                  </span>
                  <p className={clsx(styles['likes'], 'd-inline block ms-3')}>
                    {post.likes?.length} likes
                  </p>
                </div>
                {post.content && (
                  <p className={clsx(styles['post-content'], 'd-block pt-3')}>{post.content}</p>
                )}
              </main>
              <hr />
              <footer className={clsx(styles['comment-section'])}>
                {post.comments?.length! > 0 && (
                  <p
                    className={clsx(styles['comment-link'], 'd-block p-0 pb-2')}
                    onClick={() => {
                      setCurrentPost(post);
                      setShowCurrentPost(true);
                    }}
                  >
                    View all {post.comments?.length} comments
                  </p>
                )}
                <form
                  onSubmit={onComment}
                  className="d-flex justify-content-between align-items-center w-100"
                >
                  <textarea
                    name="comment"
                    className={clsx(windowViewStyles['comment-box'], 'flex-fill')}
                    placeholder="Add a comment..."
                    rows={1}
                    spellCheck={false}
                  />
                  <button
                    type="submit"
                    onClick={() => setCurrentPost(post)}
                    className={clsx(windowViewStyles['submit-btn'], 'ms-3 px-2 py-1')}
                  >
                    Post
                  </button>
                </form>
              </footer>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default HomePage;
