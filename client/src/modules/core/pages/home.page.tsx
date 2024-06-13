import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import clsx from 'clsx';
import { UploadPostWindow, PostWindow } from '../components';
import Menu from '../components/menu.component';
import useFormat from '../hooks/useFormat';
import { getHomePosts, likePost, sendComment } from '../services/post.service';
import {
  AUTHOR_POST_MENU,
  FOLLOWP_POST_MENU,
  DEFAULT_AVATAR,
} from '../constants';
import { PostData } from '../types';
import styles from '../styles/pages/home.module.sass';
import postWindowStyles from '../styles/components/post-window.module.sass';
import {
  uri,
  toast,
  useGlobalContext,
  Loader,
  Overlay,
  useThemeContext,
} from '@global';
import { useSidebarOptionsContext } from '../providers';
import axios from 'axios';

function HomePage() {
  console.log('HomePage');
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState([] as PostData[]);
  const [currentPost, setCurrentPost] = useState({} as PostData);
  const [showCurrentPost, setShowCurrentPost] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  // const { refreshPage } = useGlobalContext();

  // temp
  const authenticationStorage = {
    identity: {
      id: 32,
    },
  };

  const { setLink } = useSidebarOptionsContext();
  const { formatTime } = useFormat();

  const authorMenu = AUTHOR_POST_MENU.map((item) => {
    switch (item.name) {
      case 'Delete post': {
        item.functionHandler = async () => {
          setShowActionMenu(false);
          const response = await item.function!(currentPost.id);
          // refreshPage();
          // toast.display(
          //   response.message,
          //   response.success ? 'success' : 'error',
          // );
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
    const form = event.currentTarget;
    const commentValue = (event.target as HTMLFormElement).comment.value;
    // if (!commentValue) return toast.display('Comment cannot be empty', 'error');
    const response = await sendComment(
      authenticationStorage.identity!.id,
      currentPost.id,
      commentValue,
    );
    if (response.success) {
      form.reset();
      // refreshPage();
      // toast.display(response.message, 'success');
    }
  };

  // useEffect(() => {
  //   (async function fetchPosts() {
  //     const response = await getHomePosts(32);
  //     if (response.success && response.data) {
  //       setPosts(response.data);
  //       setReady(true);
  //     } else toast.display(response.message, 'error');
  //   })();
  // }, []);

  if (!ready)
    return (
      // <Overlay
      //   exitHandler={() => {
      //     setReady(true);
      //   }}
      // >
      <Loader />
      // </Overlay>
    );
  return (
    <div>HomePage</div>
    // <>
    //   <button
    //     onClick={() => {
    //       axios
    //         .delete('http://localhost:3000/api/logout')
    //         .then((res) => {
    //           console.log(res);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     }}
    //   >
    //     Testtttttttttttttttttt
    //   </button>
    //   {showActionMenu && (
    //     <Overlay exitHandler={() => setShowActionMenu(false)}>
    //       <Menu
    //         list={
    //           (authenticationStorage.identity!.id === currentPost.uid &&
    //             authorMenu) ||
    //           FOLLOWP_POST_MENU
    //         }
    //       />
    //     </Overlay>
    //   )}
    //   {showCreatePost && (
    //     <UploadPostWindow
    //       defaultPost={currentPost}
    //       exitHandler={() => {
    //         setShowCreatePost(false);
    //         setShowActionMenu(false);
    //       }}
    //       method="put"
    //     />
    //   )}
    //   {showCurrentPost && (
    //     <PostWindow
    //       post={currentPost}
    //       onExit={() => setShowCurrentPost(false)}
    //     />
    //   )}
    //   <section className={styles['posts-wrapper']}>
    //     {posts.map((post: PostData) => {
    //       return (
    //         <div
    //           className={clsx(styles.post, 'w-100 my-5 position-relative')}
    //           key={post.id}
    //         >
    //           <span
    //             className={clsx(
    //               'position-absolute top-0 end-0',
    //               'p-3',
    //               'fs-3',
    //               'pe-auto',
    //             )}
    //             role="button"
    //             onClick={() => {
    //               setShowActionMenu(true);
    //               setCurrentPost(post);
    //             }}
    //             aria-label="post-menu"
    //           >
    //             <i className="icon-ellipsis"></i>
    //           </span>
    //           <header className="d-flex">
    //             <span
    //               className={clsx(
    //                 styles.avatar,
    //                 'd-flex justify-content-center align-items-center',
    //                 'me-3 rounded-circle',
    //                 'position-relative',
    //                 'overflow-hidden',
    //               )}
    //             >
    //               <LazyLoadImage
    //                 className={clsx(
    //                   post.avatar?.orientation === 'portrait'
    //                     ? 'w-100 h-auto'
    //                     : 'w-auto h-100',
    //                 )}
    //                 alt="profile"
    //                 src={uri.transformImageCDN(
    //                   'avatar' in post ? post.avatar!.url : DEFAULT_AVATAR,
    //                   'w_56,f_auto',
    //                 )}
    //               />
    //             </span>
    //             <div className="d-flex align-items-center">
    //               <Link
    //                 className={clsx(styles.username, 'd-block', 'fw-bolder')}
    //                 to={`/profile/${post.uid}`}
    //                 onClick={() => setLink('profile')}
    //               >
    //                 {/* {post.username} */}
    //               </Link>
    //               <span className="mx-2 fw-bold">&middot;</span>
    //               <p className={clsx(styles['date-time'], 'd-block')}>
    //                 {formatTime(post.createdAt!)}
    //               </p>
    //             </div>
    //           </header>
    //           <div
    //             role="button"
    //             className={clsx(
    //               post.file.orientation === 'portrait' && styles['post-image'],
    //               styles['negative-margin'],
    //               'my-3',
    //               'd-flex justify-content-center align-items-center',
    //             )}
    //             onClick={() => {
    //               setCurrentPost(post);
    //               setShowCurrentPost(true);
    //             }}
    //             aria-label="post-details"
    //           >
    //             <LazyLoadImage
    //               className={
    //                 post.file.orientation === 'landscape'
    //                   ? 'img-fluid'
    //                   : 'h-100 w-auto'
    //               }
    //               alt="profile"
    //               src={uri.transformImageCDN(post.file.url, 'h_584,f_auto')}
    //             />
    //           </div>
    //           <main className={clsx('position-relative')}>
    //             <Link
    //               className={clsx(
    //                 styles['content-username'],
    //                 'd-inline-block p-2 mb-3',
    //                 'fw-bold',
    //               )}
    //               to={`/profile/${post.uid}`}
    //               onClick={() => setLink('profile')}
    //             >
    //               {/* {post.username} */}
    //             </Link>
    //             <div className={clsx('d-flex align-items-center')}>
    //               <span
    //                 className={clsx(
    //                   styles.icons,
    //                   'd-flex align-items-center',
    //                   'fs-4',
    //                 )}
    //               >
    //                 <i
    //                   onClick={async () => {
    //                     const response = await likePost(
    //                       authenticationStorage.identity!.id,
    //                       post.id,
    //                     );
    //                     if (response.success) refreshPage();
    //                   }}
    //                   className={clsx(
    //                     styles['likes-icon'],
    //                     `icon-heart${
    //                       post.likes?.includes(
    //                         authenticationStorage.identity?.id!,
    //                       )
    //                         ? ''
    //                         : '-empty'
    //                     }`,
    //                   )}
    //                 />
    //               </span>
    //               <p className={clsx(styles['likes'], 'd-inline block ms-3')}>
    //                 {post.likes?.length} likes
    //               </p>
    //             </div>
    //             {post.content && (
    //               <p className={clsx(styles['post-content'], 'd-block pt-3')}>
    //                 {post.content}
    //               </p>
    //             )}
    //           </main>
    //           <hr />
    //           <footer className={clsx(styles['comment-section'])}>
    //             {post.comments?.length! > 0 && (
    //               <p
    //                 role="button"
    //                 className={clsx(styles['comment-link'], 'd-block p-0 pb-2')}
    //                 onClick={() => {
    //                   setCurrentPost(post);
    //                   setShowCurrentPost(true);
    //                 }}
    //                 aria-label="view-comments"
    //               >
    //                 View all {post.comments?.length} comments
    //               </p>
    //             )}
    //             <form
    //               onSubmit={onComment}
    //               className="d-flex justify-content-between align-items-center w-100"
    //             >
    //               <textarea
    //                 name="comment"
    //                 className={clsx(
    //                   postWindowStyles['comment-box'],
    //                   'flex-fill',
    //                 )}
    //                 placeholder="Add a comment..."
    //                 rows={1}
    //                 spellCheck={false}
    //               />
    //               <button
    //                 type="submit"
    //                 onClick={() => setCurrentPost(post)}
    //                 className={clsx(
    //                   postWindowStyles['submit-btn'],
    //                   'ms-3 px-2 py-1',
    //                 )}
    //               >
    //                 Post
    //               </button>
    //             </form>
    //           </footer>
    //         </div>
    //       );
    //     })}
    //   </section>
    // </>
  );
}

export default HomePage;
