import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useAuth, useGlobal, PostsVerticalView, Loading } from '@components';
import { HomeAPI, HomePost } from './types';

function HomePage() {
  const [refresh, setRefresh] = useState(true);
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState([] as HomePost[]);
  const { authentication } = useAuth();
  const { displayToast } = useGlobal();

  useEffect(() => {
    if (refresh) {
      axios
        .get('/api/post/home', { params: { uid: authentication.user!.id } })
        .then((res: AxiosResponse) => {
          const response: HomeAPI = res.data;
          setPosts(response.data);
          setReady(true);
        })
        .catch((err: any) => {
          displayToast(err.response.data.message, 'error');
        });
    }
    setRefresh(false);
  }, [refresh, authentication, displayToast]);

  if (!ready) return <Loading />;
  return (
    <>
      {/* // <PostUploadWindow
        //   closeFunction={setUpdatePost}
        //   post={post}
        //   api="/api/post/update"
        //   method="put"
        // /> */}

      {ready && <PostsVerticalView posts={posts} />}
    </>
  );
}

export default HomePage;
