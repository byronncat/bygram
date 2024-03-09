import { useAuth, useGlobal } from '@components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from '@sass/rootLayout.module.sass';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

interface ProfilePageProps {
  _id: string;
  uid: number;
  username: string;
  avatar: string;
  followers: number;
  followings: number;
  description: string;
  posts: any[];
  isFolowing: boolean;
}

const defaultAvatar =
  'https://res.cloudinary.com/dq02xgn2g/image/upload/v1709561629/social-media-app/7/jqbxw8xdruxihtkuujbh.jpg';

function ProfilePage() {
  const [profile, setProfile] = useState({} as ProfilePageProps);
  const [ready, setReady] = useState(false);
  const { authentication } = useAuth();
  const { displayToast } = useGlobal();
  const { register, handleSubmit } = useForm();
  const [refresh, setRefresh] = useState(false);

  const submitForm = (data: any) => {
    const id = authentication.user!.id;
    const formData = new FormData();
    formData.append('file', data.file[0]);
    formData.append('uid', id!.toString());
    axios
      .put('/api/profile/avatar', formData)
      .then((result: any) => {
        displayToast(result.data.message, 'success');
        setRefresh(!refresh);
      })
      .catch((error: any) => displayToast(error.response.data.message, 'error'));
  };

  function follow() {
    axios
      .post('/api/profile/follow', { uid: authentication.user?.id, target: profile.uid })
      .then((res) => {
        displayToast(res.data.message, 'success');
        setRefresh(!refresh);
      });
  }

  function unfollow() {
    axios
      .delete('/api/profile/unfollow', {
        data: { uid: authentication.user?.id, target: profile.uid },
      })
      .then((res) => {
        displayToast(res.data.message, 'success');
        setRefresh(!refresh);
      });
  }

  let { username } = useParams();
  useEffect(() => {
    axios
      .get(`/api/profile/${username}`, { params: { uid: authentication.user!.id } })
      .then((res) => {
        const response = res.data;
        setReady(true);
        setProfile(response.data);
      })
      .catch((err) => {
        displayToast(err.response.data.message, 'error');
      });
  }, [refresh, username, authentication.user, displayToast]);

  return !ready ? (
    <></>
  ) : (
    <>
      <div className={clsx(styles['profile-wrapper'], 'text-white overflow-y-scroll', 'w-100 p-5')}>
        <header className={clsx('d-flex', 'mb-5')}>
          <form
            onSubmit={handleSubmit(submitForm)}
            className={clsx(
              styles['avatar-container'],
              'd-flex justify-content-center align-items-center',
              'p-0 rounded-circle',
              'position-relative overflow-hidden'
            )}
          >
            <img
              className="w-100 h-auto"
              src={profile.avatar ? profile.avatar : defaultAvatar}
              alt="profile"
            />
            {authentication.user?.id === profile.uid && (
              <input
                type="file"
                className={clsx(
                  'cur-pointer',
                  'h-100 w-100',
                  'position-absolute top-0 start-0',
                  'opacity-0'
                )}
                {...register('file', {
                  onChange: () => {
                    handleSubmit(submitForm)();
                  },
                  required: true,
                })}
              ></input>
            )}
          </form>
          <div className="ps-5">
            <div className={clsx('d-flex align-items-center', 'my-3')}>
              <h2 className={clsx('m-0 me-5', 'fs-3 lh-1')}>{profile.username}</h2>
              {profile.uid !== authentication.user!.id ? (
                profile.isFolowing ? (
                  <button
                    className={clsx(styles['following-button'], 'd-block rounded', 'px-2 py-1')}
                    onClick={unfollow}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className={clsx(styles['following-button'], 'd-block rounded', 'px-2 py-1')}
                    onClick={follow}
                  >
                    Follow
                  </button>
                )
              ) : (
                <></>
              )}
            </div>

            <ul className="d-flex p-0">
              <li className={clsx('list-unstyled', 'me-4')}>
                <span className="pe-1 fw-bolder">{profile.posts.length}</span>
                posts
              </li>

              <li className={clsx('list-unstyled', 'me-4')}>
                <span className="pe-1 fw-bolder">{profile.followers}</span>
                followers
              </li>
              <li className="list-unstyled">
                <span className="pe-1 fw-bolder">{profile.followings}</span>
                following
              </li>
            </ul>

            <p>{profile.description}</p>
          </div>
        </header>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="8px">
            {profile.posts.map((post: any, index: number) => {
              return <img className="img-fluid" alt="profile" src={post.imgURL} key={index} />;
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
}

export default ProfilePage;
