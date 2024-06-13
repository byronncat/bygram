import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import clsx from 'clsx';

import { useGlobalContext, toast, Loader, ErrorPage } from '@global';
import {
  changeAvatar,
  follow,
  // getProfile,
  removeAvatar,
  unfollow,
} from '../services/profile.service';
// import { DEFAULT_AVATAR } from '../constants';
import { PostData, ProfileData } from '../types';
import { MenuItem } from '../types/layout.d';
import styles from '../styles/pages/profile.module.sass';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getProfileAPI } from '../api';
import { useAuthenticationContext } from '@/modules/authentication';
import { DEFAULT } from '../constants';

function ProfilePage() {
  const [ready, setReady] = useState(false);
  const { user } = useAuthenticationContext();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  // const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  // const [currentPost, setCurrentPost] = useState({} as PostData);
  // const [showCurrentPost, setShowCurrentPost] = useState(false);

  // const { refreshPage } = useGlobalContext();
  const { register, handleSubmit } = useForm<{ file: FileList }>();
  // const changeAvatarHandler: SubmitHandler<{ file: FileList }> = async (
  //   data,
  // ) => {
  //   const response = await changeAvatar(
  //     authenticationStorage.identity!.id,
  //     data.file[0],
  //   );
  //   if (response.success) refreshPage();
  //   toast.display(response.message, response.success ? 'success' : 'error');
  // };

  // const removeAvatarHandler = async () => {
  //   setShowAvatarMenu(false);
  //   const response = await removeAvatar(authenticationStorage.identity!.id);
  //   if (response.success) refreshPage();
  //   toast.display(response.message, response.success ? 'success' : 'error');
  // };

  // async function followHandler() {
  //   const response = await follow(
  //     authenticationStorage.identity!.id,
  //     profile.uid,
  //   );
  //   if (response.success) refreshPage();
  //   toast.display(response.message, response.success ? 'success' : 'error');
  // }

  // async function unfollowHandler() {
  //   const response = await unfollow(
  //     authenticationStorage.identity!.id,
  //     profile.uid,
  //   );
  //   if (response.success) refreshPage();
  //   toast.display(response.message, response.success ? 'success' : 'error');
  // }

  const { username } = useParams();
  useEffect(() => {
    if (!username || !user) return;
    (async function fetchProfile() {
      const response = await getProfileAPI(username, user.id);
      if (response.success && response.data) {
        setProfile(response.data);
      } else toast.error(response.message);
      setReady(true);
    })();
  }, [user]);

  // const inpurRef = useRef<HTMLInputElement | null>(null);
  // const { ref, ...rest } = register('file', {
  //   onChange: (data) => {
  //     console.log(data);
  //     handleSubmit(changeAvatarHandler)();
  //   },
  //   required: true,
  // });

  // const avatarMenu = [
  //   {
  //     name: 'Remove avatar',
  //     functionHandler: () => removeAvatarHandler(),
  //   },
  //   {
  //     name: 'Upload avatar',
  //     functionHandler: () => {
  //       inpurRef.current?.click();
  //       setShowAvatarMenu(false);
  //     },
  //   },
  //   {
  //     name: 'Cancel',
  //     functionHandler: () => setShowAvatarMenu(false),
  //   },
  // ] as MenuItem[];
  if (!ready) return <Loader />;
  // TODO: add not loaded profile page
  // if (ready && !profile) return <ErrorPage />;
  return (
    <>
      {/* {showCurrentPost && (
        <PostWindow
          post={currentPost}
          onExit={() => setShowCurrentPost(false)}
        />
      )}
      {showAvatarMenu && (
        <Overlay exitHandler={() => setShowAvatarMenu(false)}>
          <Menu list={avatarMenu} />
        </Overlay>
      )} */}

      <main className={clsx('text-white', 'w-full h-full max-w-250 px-5 py-8')}>
        <header className={clsx('flex', 'pb-10', 'border-b border-white/[.1]')}>
          <form
            className={clsx(
              'w-36 h-36 p-1',
              'flex justify-center items-center',
              'rounded-full',
              'relative overflow-hidden',
              'border-3 border-cerise-700',
            )}
          >
            <span className="w-full h-full rounded-full overflow-hidden">
              <img
                className={clsx(
                  profile?.avatar?.orientation === 'landscape'
                    ? 'w-auto h-full'
                    : 'w-full h-auto',
                )}
                // style={{ transform: 'avatar' in profile ? 'none' : 'scale(1.4)' }}
                src={profile?.avatar?.url || DEFAULT.AVATAR}
                alt="profile"
                // onClick={
                //   profile?.uid === authenticationStorage.identity?.id
                //     ? () => setShowAvatarMenu(true)
                //     : () => {}
                // }
              />
            </span>
            {user?.id === profile?.uid && (
              <input
                type="file"
                className={clsx(
                  // 'cur-pointer',
                  'absolute top-0 start-0',
                  'opacity-0',
                  profile?.avatar?.url ? 'd-none' : 'h-100 w-100',
                )}
                // {...rest}
                // name="file"
                // ref={(e) => {
                //   ref(e);
                //   inpurRef.current = e;
                // }}
              />
            )}
          </form>
          <div className={clsx('flex flex-col gap-y-4', ' ps-5')}>
            <div className={clsx('d-flex align-items-center')}>
              <h2 className={clsx('me-5', 'text-xl lh-1')}>
                {profile?.username}
              </h2>
              {/* {profile.uid !== authenticationStorage.identity?.id &&
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
                ))} */}
            </div>

            <ul className="flex p-0">
              <li className={clsx('list-unstyled', 'me-4')}>
                <span className="pe-1 fw-bolder">0</span>
                posts
              </li>
              <li className={clsx('list-unstyled', 'me-4')}>
                <span className="pe-1 fw-bolder">
                  {profile?.followers.length}
                </span>
                followers
              </li>
              <li className="list-unstyled">
                <span className="pe-1 fw-bolder">
                  {profile?.followings.length}
                </span>
                following
              </li>
            </ul>

            {profile?.description || (
              <p className="text-sm text-white/[0.62]">profile.description</p>
            )}
          </div>
        </header>
        {/* <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="8px">
            {profile.posts?.map((post: any) => {
              return (
                <LazyLoadImage
                  role="button"
                  className="img-fluid"
                  alt="profile"
                  src={post.file.dataURL}
                  // wrong key
                  // key={index}
                  onClick={() => {
                    setCurrentPost(post);
                    setShowCurrentPost(true);
                  }}
                />
              );
            })}
          </Masonry>
        </ResponsiveMasonry> */}
      </main>
    </>
  );
}

export default ProfilePage;
