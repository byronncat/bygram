import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { PostsVerticalView, Loading } from '@components';
import { useStorageContext, useGlobalContext } from '@contexts';
import { HomeAPI, HomePost } from './types';

function HomePage() {
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState([] as HomePost[]);
  const { authenticationStorage } = useStorageContext();
  const { displayToast } = useGlobalContext();

  useEffect(() => {
    axios
      .get('/api/post/home', { params: { uid: authenticationStorage.user!.id } })
      .then((res: AxiosResponse) => {
        const response: HomeAPI = res.data;
        setPosts(response.data);
        setReady(true);
      })
      .catch((err: any) => {
        displayToast(err.response.data.message, 'error');
      });
  }, [authenticationStorage, displayToast]);

  if (!ready) return <Loading />;
  return (
    <>
      {/* // <PostUploadWindow
        //   onExit={setUpdatePost}
        //   post={post}
        //   api="/api/post/update"
        //   method="put"
        // /> */}

      {ready && <PostsVerticalView posts={posts} />}
    </>
  );
}

export default HomePage;
