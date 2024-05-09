import { useState, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import clsx from 'clsx';
import { PostWindow } from '../components';
import Menu from '../components/menu.component';
import { useGlobalContext, toast, Loader, Overlay } from '@global';
import { useAuthenticationContext } from '@authentication';
import {
  changeAvatar,
  follow,
  getProfile,
  removeAvatar,
  unfollow,
} from '../services/profile.service';
import { DEFAULT_AVATAR } from '../constants';
import { PostData, ProfileData } from '../types';
import { MenuItem } from '../types/layout.d';
import styles from '../styles/pages/profile.module.sass';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function ProfilePage() {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState({} as ProfileData);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [currentPost, setCurrentPost] = useState({} as PostData);
  const [showCurrentPost, setShowCurrentPost] = useState(false);

  // temp
  const authenticationStorage = {
    identity: {
      id: 32,
    },
  };

  const { refreshPage } = useGlobalContext();
  const { register, handleSubmit } = useForm<{ file: FileList }>();

  const changeAvatarHandler: SubmitHandler<{ file: FileList }> = async (
    data,
  ) => {
    const response = await changeAvatar(
      authenticationStorage.identity!.id,
      data.file[0],
    );
    if (response.success) refreshPage();
    toast.display(response.message, response.success ? 'success' : 'error');
  };

  const removeAvatarHandler = async () => {
    setShowAvatarMenu(false);
    const response = await removeAvatar(authenticationStorage.identity!.id);
    if (response.success) refreshPage();
    toast.display(response.message, response.success ? 'success' : 'error');
  };

  async function followHandler() {
    const response = await follow(
      authenticationStorage.identity!.id,
      profile.uid,
    );
    if (response.success) refreshPage();
    toast.display(response.message, response.success ? 'success' : 'error');
  }

  async function unfollowHandler() {
    const response = await unfollow(
      authenticationStorage.identity!.id,
      profile.uid,
    );
    if (response.success) refreshPage();
    toast.display(response.message, response.success ? 'success' : 'error');
  }

  const { uid } = useParams();
  useEffect(() => {
    (async function fetchProfile() {
      const response = await getProfile(uid as unknown as number);
      if (response.success && response.data) {
        setReady(true);
        setProfile(response.data);
      } else toast.display(response.message, 'error');
    })();
  }, [refreshPage, uid]);

  const inpurRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register('file', {
    onChange: (data) => {
      handleSubmit(changeAvatarHandler)();
    },
    required: true,
  });

  const avatarMenu = [
    {
      name: 'Remove avatar',
      functionHandler: () => removeAvatarHandler(),
    },
    {
      name: 'Upload avatar',
      functionHandler: () => {
        inpurRef.current?.click();
        setShowAvatarMenu(false);
      },
    },
    {
      name: 'Cancel',
      functionHandler: () => setShowAvatarMenu(false),
    },
  ] as MenuItem[];

  if (!ready) return <Loader />;
  return (
    <>
      {showCurrentPost && (
        <PostWindow
          post={currentPost}
          onExit={() => setShowCurrentPost(false)}
        />
      )}
      {showAvatarMenu && (
        <Overlay exitHandler={() => setShowAvatarMenu(false)}>
          <Menu list={avatarMenu} />
        </Overlay>
      )}

      <div
        className={clsx(styles['profile-wrapper'], 'text-white', 'w-100 p-5')}
      >
        <header className={clsx('d-flex', 'mb-5')}>
          <form
            className={clsx(
              styles['avatar-container'],
              'd-flex justify-content-center align-items-center',
              'p-0 rounded-circle',
              'position-relative overflow-hidden',
            )}
          >
            <img
              className={
                profile.avatar?.sizeType === 'landscape'
                  ? 'w-auto h-100'
                  : 'w-100 h-auto'
              }
              style={{ transform: 'avatar' in profile ? 'none' : 'scale(1.4)' }}
              src={
                'avatar' in profile ? profile.avatar!.dataURL : DEFAULT_AVATAR
              }
              alt="profile"
              onClick={
                profile.uid === authenticationStorage.identity?.id
                  ? () => setShowAvatarMenu(true)
                  : () => {}
              }
            />
            {authenticationStorage.identity?.id === profile.uid && (
              <input
                type="file"
                className={clsx(
                  'cur-pointer',
                  'position-absolute top-0 start-0',
                  'opacity-0',
                  'avatar' in profile ? 'd-none' : 'h-100 w-100',
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
              <h2 className={clsx('m-0 me-5', 'fs-3 lh-1')}>
                {profile.username}
              </h2>
              {profile.uid !== authenticationStorage.identity?.id &&
                (profile.followers?.includes(
                  authenticationStorage.identity!.id,
                ) ? (
                  <button
                    className={clsx(
                      styles['following-button'],
                      'd-block rounded',
                      'px-2 py-1',
                    )}
                    onClick={unfollowHandler}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className={clsx(
                      styles['following-button'],
                      'd-block rounded',
                      'px-2 py-1',
                    )}
                    onClick={followHandler}
                  >
                    Follow
                  </button>
                ))}
            </div>

            <ul className="d-flex p-0">
              <li className={clsx('list-unstyled', 'me-4')}>
                <span className="pe-1 fw-bolder">{profile.posts?.length}</span>
                posts
              </li>
              <li className={clsx('list-unstyled', 'me-4')}>
                <span className="pe-1 fw-bolder">
                  {profile.followers.length}
                </span>
                followers
              </li>
              <li className="list-unstyled">
                <span className="pe-1 fw-bolder">
                  {profile.followings.length}
                </span>
                following
              </li>
            </ul>

            {'description' in profile ? <p>profile.description</p> : <></>}
          </div>
        </header>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="8px">
            {profile.posts?.map((post: any, index: number) => {
              return (
                <LazyLoadImage
                  role="button"
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
