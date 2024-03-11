import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { useAuth, Overlay, useGlobal, UploadPost, PostWindow } from '@components';
import styles from '@sass/home.module.sass';
import clsx from 'clsx';

function HomePage() {
  const { authentication } = useAuth();
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('/api/post/all', { params: { id: authentication.user?.id } })
      .then((res: AxiosResponse) => {
        setPosts(res.data.posts);
        setReady(true);
      })
      .catch((err: any) => {
        console.log(err.response);
      });
  }, [authentication]);

  const [showMenu, setShowMenu] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [updatePost, setUpdatePost] = useState(false);
  const [post, setPost] = useState({} as any);
  const { displayToast } = useGlobal();
  const menu = [
    {
      name: 'Delete post',
      function: (post: any) => deletePost(post),
    },
    {
      name: 'Edit',
      function: (post: any) => editPost(post),
    },
    {
      name: 'Report',
      function: (post: any) => console.log(post),
    },
  ];
  function deletePost(post: any) {
    axios.delete(`/api/post/delete/${post.id}`).then((res: any) => {
      displayToast('Post deleted', 'success');
    });
  }

  function editPost(post: any) {
    setUpdatePost(true);
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <div className={clsx(styles.wrapper, 'd-flex flex-column align-items-center')}>
      {showMenu && (
        <Overlay closeFunction={setShowMenu}>
          <ul className={clsx(styles.menu, 'list-group')}>
            {menu.map((item, index) => {
              return (
                <li
                  key={index}
                  aria-current="true"
                  className={clsx(styles['menu-item'], 'list-group-item text-center')}
                  onClick={() => {
                    if (authentication.user?.id !== post.uid) {
                      displayToast('You are not authorized to perform this action', 'error');
                      return;
                    } else {
                      item.function(post);
                      setShowMenu(false);
                    }
                  }}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </Overlay>
      )}
      {updatePost && (
        <UploadPost closeFunction={setUpdatePost} post={post} api="/api/post/update" method="put" />
      )}
      {showPost && <PostWindow post={post} showPost={showPost} setShowPost={setShowPost} />}
      {ready &&
        posts.map((post: any, index: number) => {
          return (
            <section className={clsx(styles.post, 'w-100 p-3 my-4 position-relative')} key={index}>
              <span
                className="position-absolute top-0 end-0 p-3 fs-3 pe-auto"
                role="button"
                onClick={() => {
                  setShowMenu(!showMenu);
                  setPost(post);
                }}
              >
                <i className="fa-solid fa-ellipsis"></i>
              </span>
              <header className="post-profile d-flex">
                <img
                  className="post-profile-picture rounded-circle me-3"
                  alt="profile"
                  src={post.avatar}
                  width={50}
                  height={50}
                />
                <span className="post-profile-info d-flex flex-column">
                  <span className="d-flex">
                    <span className="d-block">{post.author}</span>
                    <span className="ms-2 d-block">&middot; Sep 10</span>
                  </span>
                  Something
                </span>
              </header>
              <div
                className="my-3 mx-n3"
                onClick={() => {
                  setShowPost(true);
                  setPost(post);
                }}
              >
                <img className="img-fluid" alt="profile" src={post.imgURL} />
              </div>
              <header className="Meta">
                <Link className="text-reset text-decoration-none fw-bold" to="https://example.com/">
                  <span>{post.author}</span>
                </Link>
                <span className="ms-2" style={{ whiteSpace: 'pre-line' }}>
                  {post.content}
                </span>
              </header>
              <div className="post-info">
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
              </div>
            </section>
          );
        })}
    </div>
  );
}

export default HomePage;
