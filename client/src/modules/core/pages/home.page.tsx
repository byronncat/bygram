import { useState, useEffect } from 'react';
import { PostWindow } from '../components';
import Menu from '../components/menu.component';
import { getHomePosts } from '../api';
import { likePost, sendComment } from '../services/post.service';
import {
  AUTHOR_POST_MENU,
  FOLLOWP_POST_MENU,
  DEFAULT_AVATAR,
} from '../constants';
import { PostData } from '../types';
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

import { VerticalPostLayout } from '../layouts';
import type { Post } from '../types';
import { homepagePost } from '../__mocks__';
import { useAuthenticationContext } from '@/modules/authentication';

function HomePage() {
  const [ready, setReady] = useState(true);
  const [posts, setPosts] = useState(homepagePost);

  const [currentPost, setCurrentPost] = useState({} as PostData);
  const [showCurrentPost, setShowCurrentPost] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);

  const { setOption } = useSidebarOptionsContext();

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

  // const onComment = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const form = event.currentTarget;
  //   const commentValue = (event.target as HTMLFormElement).comment.value;
  //   // if (!commentValue) return toast.display('Comment cannot be empty', 'error');
  //   const response = await sendComment(
  //     authenticationStorage.identity!.id,
  //     currentPost.id,
  //     commentValue,
  //   );
  //   if (response.success) {
  //     form.reset();
  //     // refreshPage();
  //     // toast.display(response.message, 'success');
  //   }
  // };

  const { user } = useAuthenticationContext();
  useEffect(() => {
    (async function fetchPosts() {
      const response = await getHomePosts();
      console.log(response);
      // if (response.success && response.data) {
      //   setPosts(response.data);
      //   setReady(true);
      // } else toast.display(response.message, 'error');
    })();
  }, []);

  if (!ready) return <Loader.BoxSpin />;
  return (
    <div>homepage</div>
    // <VerticalPostLayout posts={posts} />
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

    // </>
  );
}

export default HomePage;
