import { useState, useEffect } from 'react';
import './home.page.sass';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('/api/post/all')
      .then((res: AxiosResponse) => {
        setPosts(res.data.posts);
        setReady(true);
      })
      .catch((err: any) => {
        console.log(err.response);
      });
  }, []);

  const [showMenu, setShowMenu] = useState(false);
  const [post, setPost] = useState({} as any);
  const menuHandler = (postItem: any) => {
    setShowMenu(!showMenu);
    setPost(postItem);
  };

  function deletePost(post: any) {
    axios.delete(`/api/post/delete/${post.id}`).then((res: any) => {
      console.log(res);
    });
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-8 d-flex flex-column align-items-center overflow-y-scroll">
      {showMenu && (
        <span className="overlay position-absolute z-2 top-0 start-0">
          <span className="overlay bg-black opacity-50">
            <button
              type="button"
              className="shadow-none btn-close position-absolute top-0 end-0 p-4"
              aria-label="Close"
              onClick={() => setShowMenu(false)}
            ></button>{' '}
          </span>
          <ul className="list-group w-50 position-relative top-50 start-50 translate-middle">
            <li
              className="list-group-item btn btn-danger"
              aria-current="true"
              onClick={() => deletePost(post)}
            >
              Delete post
            </li>
            <li
              className="list-group-item btn btn-primary"
              aria-current="true"
              // onClick={() => setIsActiveUploadPost(true)}
            >
              Edit
            </li>
          </ul>
        </span>
      )}
      {ready &&
        posts.map((post: any, index: number) => {
          return (
            <section className="post w-100 p-3 my-4 position-relative" key={index}>
              <span
                className="position-absolute top-0 end-0 p-3 fs-3 pe-auto"
                role="button"
                onClick={() => menuHandler(post)}
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
              <div className="post-image my-3">
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
