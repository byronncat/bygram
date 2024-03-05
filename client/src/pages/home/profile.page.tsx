import { useAuth, Menu } from '@components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from '@sass/rootLayout.module.sass';
import clsx from 'clsx';

interface ProfilePageProps {
  _id: string;
  avatar: string;
  uid: number;
  username: string;
  posts: any[];
}

const defaultAvatar =
  'https://res.cloudinary.com/dq02xgn2g/image/upload/v1709561629/social-media-app/7/jqbxw8xdruxihtkuujbh.jpg';

function ProfilePage() {
  const { authentication } = useAuth();
  const [profile, setProfile] = useState({} as ProfilePageProps); // [1
  const [ready, setReady] = useState(false);
  useEffect(() => {
    axios
      .get(`/api/profile/${authentication.user!.id}`)
      .then((res) => {
        const response = res.data;
        setReady(true);
        setProfile(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);
  return !ready ? (
    <>
      <div>Loading...</div>
    </>
  ) : (
    <>
      <div className={clsx(styles['profile-wrapper'], 'text-white', 'w-100 p-5')}>
        <header className={clsx('d-flex', 'mb-5')}>
          <button
            className={clsx(
              styles['avatar-container'],
              'd-flex justify-content-center align-items-center',
              'p-0 rounded-circle',
              'overflow-hidden'
            )}
            onClick={() => {
              console.log('clicked');
            }}
          >
            <img
              className="h-100 w-auto"
              src={profile.avatar ? profile.avatar : defaultAvatar}
              alt="profile"
            />
          </button>
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
                <img className="img-fluid" alt="profile" src={post.imgURL} />
              </section>
            );
          })}
        </section>
      </div>
    </>
  );
}

export default ProfilePage;
