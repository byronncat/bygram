import axios from 'axios';
import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { PostWindow } from '@components';
import { useStorageContext } from '@contexts';

function ExplorePage() {
  const { authenticationStorage } = useStorageContext();
  const [refresh] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('/api/post/explore', { params: { uid: authenticationStorage.user?.id } })
      .then((res: any) => {
        setPosts(res.data.posts);
      })
      .catch((err: any) => {
        console.log(err.response);
      });
  }, [refresh, authenticationStorage]);

  const [showPost, setShowPost] = useState(false);
  const [post, setPost] = useState({} as any);

  return (
    <>
      {showPost && <PostWindow post={post} onExit={setShowPost} />}
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }} className="w-100">
        <Masonry gutter="8px">
          {posts.map((post: any, index: number) => {
            return (
              <img
                className="img-fluid"
                alt="profile"
                src={post.file.dataURL}
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
