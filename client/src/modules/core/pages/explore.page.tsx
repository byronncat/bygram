import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { PostWindow } from '../components';
import { uri, toast, Loader } from '@global';
import { useAuthenticationContext } from '@authentication';
import { explorePost } from '../services/post.service';
import { Post } from '../types';
import clsx from 'clsx';
import styles from '../styles/pages/explore.module.sass';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function ExplorePage() {
  // temp
  const authenticationStorage = {
    identity: {
      id: 32,
    },
  };

  const [ready, setReady] = useState(false);
  const [post, setPost] = useState({} as any);
  const [showPost, setShowPost] = useState(false);
  const [posts, setPosts] = useState([] as Post[]);

  useEffect(() => {
    (async function FetchData() {
      const response = await explorePost(authenticationStorage.identity!.id);
      if (response.success && response.data) {
        setPosts(response.data);
        setReady(true);
      } else toast.display(response.message, 'error');
    })();
  }, [ready, authenticationStorage]);
  if (!ready) return <Loader />;
  return (
    <>
      {showPost && <PostWindow post={post} onExit={() => setShowPost(false)} />}
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 576: 1, 768: 2, 992: 3 }}
        className={clsx(styles.wrapper, 'w-100 p-3')}
      >
        <Masonry gutter="8px">
          {posts.map((post: any, index: number) => {
            return (
              <LazyLoadImage
                className="img-fluid"
                alt="profile"
                src={uri.transformImageCDN(post.file.dataURL, 'f_auto')}
                key={index}
                onClick={() => {
                  setPost(post);
                  setShowPost(true);
                }}
              />
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
}

export default ExplorePage;
