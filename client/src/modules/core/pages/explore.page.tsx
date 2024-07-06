import { useEffect, useState } from 'react';
import { PostWindow } from '../components';
import { uri, toast, Loader } from '@global';
import { explorePost } from '../services/post.service';
import { Post } from '../types';
import clsx from 'clsx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { homepagePost } from '../__mocks__';

function ExplorePage() {
  const [ready, setReady] = useState(true);
  const [post, setPost] = useState({} as any);
  const [showPost, setShowPost] = useState(false);
  const [posts, setPosts] = useState(homepagePost);

  useEffect(() => {
    // (async function FetchData() {
    //   const response = await explorePost(32);
    //   if (response.success && response.data) {
    //     setPosts(response.data);
    //     setReady(true);
    //   } else toast.error(response.message);
    // })();
  }, [ready]);
  if (!ready) return <Loader.BoxSpin />;
  return (
    <>
      {showPost && <PostWindow post={post} onExit={() => setShowPost(false)} />}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post: any) => {
          return (
            <div className="aspect-square overflow-hidden">
              <LazyLoadImage
                className="object-cover w-full h-full cursor-pointer"
                alt="profile"
                src={post.file.url}
                onClick={() => {
                  setPost(post);
                  setShowPost(true);
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ExplorePage;
