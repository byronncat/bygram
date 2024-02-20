import { useState, useEffect } from "react";
import "./home.page.sass";
import axios from "axios";

function HomePage() {
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("/api/post/all").then((res: any) => {
      setPosts(res.data.posts);
    });
    setReady(true);
  }, []);

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <section className="col-8 d-flex flex-column justify-content-center align-items-center">
      {posts.map((post: any, index: number) => {
        return (
          <section className="post w-100 p-3 my-4" key={index}>
            <header className="post-profile d-flex">
                <img
                  className="post-profile-picture rounded-circle me-3"
                  alt="profile"
                  src="https://i-h2.pinimg.com/474x/58/01/02/5801020fea36221ffba33633f99a7d81--small-heart-tattoos-heart-tattoo-designs.jpg"
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
                  <a className="text-reset text-decoration-none fw-bold" href="https://example.com/">
                    <span>{post.author}</span>
                  </a>
                  <span className="ms-2" style={{ whiteSpace: 'pre-line' }}>{post.content}</span>
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
                <a className="">View comment</a>
                <p className="Text">Comment ...</p>
              </div>
          </section>
        );
      })}
    </section>
  );
}

export default HomePage;
