import { useAuth } from "../../components/index";
import axios from "axios";
import { useState, useEffect } from "react";
import "./profile.page.sass";

interface ProfilePageProps {
  _id: string;
  avatar: string;
  uid: number;
  username: string;
  posts: any[];
}

function ProfilePage() {
  const { authentication } = useAuth();
  const [profile, setProfile] = useState({} as ProfilePageProps); // [1
  const [ready, setReady] = useState(false);
  useEffect(() => {
    axios
      .get(`/api/profile/${authentication.user!.id}`)
      .then((res) => {
        console.log(res.data);
        setReady(true);
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return !ready ? (
    <>
      <div>
        Loading...
      </div>
    </>
  ) : (
    <>
      <main className="text-white">
        <div className="profile-wrapper px-5">
          <header className="d-flex mb-5">
            <img
              className="rounded-circle"
              width={180}
              height={180}
              src={profile.avatar}
              alt="profile"
            />
            <div className="ps-5">
              <div className="d-flex my-3">
                <h2 className="fs-3">{profile.username}</h2>

                <a href="#" className="btn btn-primary px-4 py-2 ms-5">
                  Follow
                </a>
              </div>

              <ul className="d-flex p-0">
                <li className="list-unstyled">
                  <span className="pe-1 fw-bolder">136</span>
                  posts
                </li>

                <li className="ps-4 list-unstyled">
                  <span className="pe-1 fw-bolder">40.5k</span>
                  followers
                </li>
                <li className="ps-4 list-unstyled">
                  <span className="pe-1 fw-bolder">302</span>
                  following
                </li>
              </ul>

              <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>
          </header>
          <section className="row">
            {profile.posts.map((post: any, index: number) => {
              return (
                <section className="col-4" key={index}>
                  <img
                    className="img-fluid"
                    alt="profile"
                    src={post.imgURL}
                  />
                </section>
              );
            })}
          </section>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
