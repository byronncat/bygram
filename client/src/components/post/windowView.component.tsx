import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Overlay, Menu, PostUploadWindow } from '@components';
import { useStorageContext, useGlobalContext } from '@contexts';
import { getComments, sendComment, likePost, deleteComment } from '@services';
import { CommentData, File, PostData, ReactProps } from '@types';
import { authorPostMenu } from '../../constants';
import styles from '@styles/post/window.module.sass';
import homeStyles from '@styles/layout/home.module.sass';

const defaultAvatar =
  'https://res.cloudinary.com/dq02xgn2g/image/upload/v1709561410/social-media-app/v60ffmwxuqgnku4uvtja.png';
interface WindowViewProps extends ReactProps {
  post: PostData;
  onExit: () => void;
}
function WindowView({ post, onExit }: WindowViewProps) {
  const [comment, setComment] = useState({} as CommentData);
  const [comments, setComments] = useState([] as CommentData[]);
  const { displayToast, setRefresh, refresh } = useGlobalContext();
  const { authenticationStorage, handleActiveLink } = useStorageContext();
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCommentMenu, setShowCommentMenu] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  useEffect(() => {
    (async () => {
      const response = await getComments(post.id);
      if (response.success && response.data) setComments(response.data);
      else displayToast(response.message, 'error');
    })();
  }, [displayToast, post, refresh]);

  const authorMenu = authorPostMenu.map((item) => {
    switch (item.name) {
      case 'Delete post': {
        item.functionHandler = async () => {
          setShowActionMenu(false);
          onExit();
          const response = await item.function!(post.id);
          displayToast(response.message, response.success && 'error');
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
    const response = await sendComment(authenticationStorage.user!.id, post.id, commentValue);
    if (response.success) {
      setRefresh(!refresh);
      displayToast(response.message, 'success');
    }
  };

  const commentMenu = [
    {
      name: 'Delete comment',
      functionHandler: async () => {
        setShowCommentMenu(false);
        const response = await deleteComment(post.id, comment.id);
        if (response.success) setRefresh(!refresh);
        displayToast(response.message, response.success ? 'success' : 'error');
      },
    },
    {
      name: 'Cancel',
      functionHandler: () => {
        setShowCommentMenu(false);
      },
    },
  ];

  return (
    <>
      {showCreatePost && (
        <PostUploadWindow
          defaultPost={post}
          zIndex={3}
          onExit={() => {
            setShowCreatePost(false);
            onExit();
          }}
          method="put"
        />
      )}
      {showActionMenu && authenticationStorage.user!.id === post.uid && (
        <Overlay zIndex={2} onExit={() => setShowActionMenu(false)}>
          <Menu list={authorMenu} />
        </Overlay>
      )}
      <Overlay onExit={() => onExit()}>
        <div className={clsx(styles['wrapper'], 'mw-100', 'd-flex')}>
          <ImageContent file={post.file} />
          <div
            className={clsx(
              styles['post-content-wrapper'],
              'd-flex flex-column p-3',
              'position-relative'
            )}
          >
            {authenticationStorage.user?.id === post.id && (
              <span
                className={clsx('position-absolute top-0 end-0', 'p-3', 'fs-3', 'pe-auto')}
                role="button"
                onClick={() => {
                  setShowActionMenu(true);
                }}
              >
                <i className="fa-solid fa-ellipsis"></i>
              </span>
            )}

            <Link
              to={`/profile/${post.uid}`}
              className={clsx(styles.link, 'd-flex align-items-center')}
              onClick={() => handleActiveLink('profile')}
            >
              <Avatar src={post.avatar?.dataURL || defaultAvatar} />
              <p className="d-inline-block m-0">{post.username}</p>
            </Link>

            <span className={clsx(styles.divider, 'my-3')} />

            <div className={clsx(styles['comments-zone'], 'overflow-scroll', 'flex-fill p-3 pt-0')}>
              <div className={clsx('w-100', 'overflow-y-scroll')}>
                <span className={(styles['post-info-content'], 'pb-3 d-block')}>
                  {post.content}
                </span>
                <div>
                  {comments.map((comment, index) => (
                    <div key={index} className="d-flex align-items-center my-2">
                      <Avatar src={comment.avatar?.dataURL || defaultAvatar} />
                      <p className="m-0">
                        <span>
                          <Link
                            to={`/profile/${comment.uid}`}
                            className={clsx(styles.link, 'd-inline-block me-2', 'fw-bold')}
                            onClick={() => handleActiveLink('profile')}
                          >
                            {comment.username}
                          </Link>
                          {comment.content}
                        </span>
                      </p>
                      {authenticationStorage.user?.id === post.id && (
                        <span
                          className={clsx('ms-auto me-3', 'fs-5', 'cursor-pointer opacity-50')}
                          role="button"
                          onClick={() => {
                            setComment(comment);
                            setShowCommentMenu(true);
                          }}
                        >
                          <i className="fa-solid fa-ellipsis"></i>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <span className={clsx(styles.divider, 'my-3')} />

            <div className={clsx(styles.footer, 'd-flex flex-column')}>
              <div className="d-flex align-items-center">
                <span className={clsx(homeStyles.icons, 'd-flex align-items-center')}>
                  <i
                    onClick={async () => {
                      const response = await likePost(authenticationStorage.user!.id, post.id);
                      if (response.success) {
                        if (likes?.includes(authenticationStorage.user?.id!)) {
                          setLikes(likes?.filter((id) => id !== authenticationStorage.user?.id));
                        }
                        if (!likes?.includes(authenticationStorage.user?.id!)) {
                          setLikes([...likes!, authenticationStorage.user?.id!]);
                        }
                        setRefresh(!refresh);
                      }
                    }}
                    className={clsx(
                      homeStyles['likes-icon'],
                      `fa-${
                        likes?.includes(authenticationStorage.user?.id!) ? 'solid' : 'regular'
                      } fa-heart`,
                      'fs-4',
                      'me-3'
                    )}
                  />
                </span>
                <span className="fw-bold">{likes?.length} likes</span>
              </div>
              <span className={clsx(styles.divider, 'my-3')} />

              <form
                onSubmit={onComment}
                className="d-flex justify-content-between align-items-center"
              >
                <textarea
                  name="comment"
                  className={clsx(styles['comment-box'], 'flex-fill')}
                  placeholder="Add a comment..."
                  rows={1}
                  spellCheck={false}
                />
                <button type="submit" className={clsx(styles['submit-btn'], 'ms-3 px-2 py-1')}>
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </Overlay>
      {showCommentMenu && authenticationStorage.user!.id === comment.uid && (
        <Overlay zIndex={2} onExit={() => setShowCommentMenu(false)}>
          <Menu list={commentMenu} />
        </Overlay>
      )}
    </>
  );
}

function ImageContent({ file }: { file: File }) {
  return (
    <div
      className={clsx(
        styles['post-image'],
        'h-100 mw-50',
        'd-flex justify-content-center align-items-center'
      )}
    >
      <img
        src={file?.dataURL}
        alt="post"
        className={clsx(
          file?.sizeType === 'landscape' ? 'w-100 h-auto' : 'w-auto h-100',
          'mw-100 mh-100'
        )}
      />
    </div>
  );
}

function Avatar({ src }: { src: string }) {
  return (
    <span
      className={clsx(
        styles.avatar,
        'd-flex justify-content-center align-items-center',
        'p-0 me-3 rounded-circle',
        'position-relative overflow-hidden'
      )}
    >
      <img className="w-100 h-auto" src={src} alt="profile" />
    </span>
  );
}

export default WindowView;
