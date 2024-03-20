import { PostWindow, Loading, Overlay, Menu } from '@components';
import { useGlobalContext, useStorageContext } from '@contexts';
import axios, { AxiosResponse } from 'axios';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { AvatarAPI } from './types';
import { Profile } from '@types';
import styles from '@styles/page/profile.module.sass';

interface ProfilePageProps extends Profile {
  _id: string;
  description?: string;
  posts: any[];
  isFollowing?: boolean;
}

const defaultAvatar =
  'https://res.cloudinary.com/dq02xgn2g/image/upload/v1709561410/social-media-app/v60ffmwxuqgnku4uvtja.png';
function ProfilePage() {
  const [ready, setReady] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [profile, setProfile] = useState({} as ProfilePageProps);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [currentPost, setCurrentPost] = useState({} as any);
  const [showCurrentPost, setShowCurrentPost] = useState(false);
  const { authenticationStorage } = useStorageContext();
  const { displayToast } = useGlobalContext();
  const { register, handleSubmit } = useForm();

  const changeAvatar = async (data: any) => {
    const uid = authenticationStorage.user!.id;
    const formData = new FormData();
    formData.append('file', data.file[0]);
    formData.append('uid', uid!.toString());
    await axios
      .put('/api/profile/avatar', formData)
      .then((result: AxiosResponse) => {
        const response = result.data as AvatarAPI;
        setProfile({ ...profile, avatar: response.data });
        displayToast(response.message, response.success ? 'success' : 'error');
        setRefresh(!refresh);
      })
      .catch((error: any) => displayToast(error.response.data.message, 'error'));
  };

  const removeAvatar = async () => {
    setShowAvatarMenu(false);
    await axios
      .put('/api/profile/avatar?type=remove', { uid: authenticationStorage.user!.id })
      .then((result: AxiosResponse) => {
        const response = result.data as AvatarAPI;
        const { avatar, ...rest } = profile;
        setProfile(rest);
        displayToast(response.message, response.success ? 'success' : 'error');
        setRefresh(!refresh);
      })
      .catch((error: any) => displayToast(error.response.data.message, 'error'));
  };

  function follow() {
    axios
      .put('/api/profile/follow', { uid: authenticationStorage.user?.id, target: profile.uid })
      .then((res) => {
        displayToast(res.data.message, 'success');
        setRefresh(!refresh);
      });
  }

  function unfollow() {
    axios
      .put('/api/profile/unfollow', { uid: authenticationStorage.user?.id, target: profile.uid })
      .then((res) => {
        displayToast(res.data.message, 'success');
        setRefresh(!refresh);
      });
  }

  const { uid } = useParams();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const ruid = searchParams.get('ruid');
    axios
      .get(`/api/profile/${uid}`, { params: { ruid } })
      .then((res) => {
        const response = res.data;
        setReady(true);
        setProfile(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        displayToast(err.response.data.message, 'error');
      });
  }, [refresh, uid, authenticationStorage.user, displayToast, searchParams]);

  const inpurRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register('file', {
    onChange: (data) => {
      handleSubmit(changeAvatar)();
    },
    required: true,
  });

  const avatarMenu = [
    {
      name: 'Remove avatar',
      function: () => removeAvatar(),
    },
    {
      name: 'Upload avatar',
      function: () => {
        inpurRef.current?.click();
        setShowAvatarMenu(false);
      },
    },
    {
      name: 'Cancel',
      function: () => setShowAvatarMenu(false),
    },
  ];

  return !ready ? (
    <Loading />
  ) : (
    <>
      {showCurrentPost && <PostWindow post={currentPost} onExit={setShowCurrentPost} />}
      {showAvatarMenu && (
        <Overlay onExit={setShowAvatarMenu}>
          <Menu list={avatarMenu} />
        </Overlay>
      )}

      <div className={clsx(styles['profile-wrapper'], 'text-white overflow-y-scroll', 'w-100 p-5')}>
        <header className={clsx('d-flex', 'mb-5')}>
          <form
            className={clsx(
              styles['avatar-container'],
              'd-flex justify-content-center align-items-center',
              'p-0 rounded-circle',
              'position-relative overflow-hidden'
            )}
          >
            <img
              className={profile.avatar?.sizeType === 'Landscape' ? 'w-auto h-100' : 'w-100 h-auto'}
              src={'avatar' in profile ? profile.avatar!.dataURL : defaultAvatar}
              alt="profile"
              onClick={
                profile.uid === authenticationStorage.user?.id
                  ? () => setShowAvatarMenu(true)
                  : () => {}
              }
            />
            {authenticationStorage.user?.id === profile.uid && (
              <input
                type="file"
                className={clsx(
                  'cur-pointer',
                  'position-absolute top-0 start-0',
                  'opacity-0',
                  'avatar' in profile ? 'd-none' : 'h-100 w-100'
                )}
                {...rest}
                name="file"
                ref={(e) => {
                  ref(e);
                  inpurRef.current = e;
                }}
              />
            )}
          </form>
          <div className="ps-5">
            <div className={clsx('d-flex align-items-center', 'my-3')}>
              <h2 className={clsx('m-0 me-5', 'fs-3 lh-1')}>{profile.username}</h2>
              {profile.uid !== authenticationStorage.user?.id &&
                (profile.isFollowing ? (
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
                ))}
            </div>

            <ul className="d-flex p-0">
              <li className={clsx('list-unstyled', 'me-4')}>
                <span className="pe-1 fw-bolder">{profile.posts.length}</span>
                posts
              </li>
              <li className={clsx('list-unstyled', 'me-4')}>
                <span className="pe-1 fw-bolder">{profile.followers.length}</span>
                followers
              </li>
              <li className="list-unstyled">
                <span className="pe-1 fw-bolder">{profile.followings.length}</span>
                following
              </li>
            </ul>

            {'description' in profile ? <p>profile.description</p> : <></>}
          </div>
        </header>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="8px">
            {profile.posts.map((post: any, index: number) => {
              return (
                <img
                  className="img-fluid"
                  alt="profile"
                  src={post.file.dataURL}
                  key={index}
                  onClick={() => {
                    setCurrentPost(post);
                    setShowCurrentPost(true);
                  }}
                />
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
}

export default ProfilePage;
