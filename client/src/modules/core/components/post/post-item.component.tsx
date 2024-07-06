import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import clsx from 'clsx';
import { useFormat } from '../../hooks';
import { EllipsisIcon, HeartIcon } from '@assets/icons';

import type { ReactProps } from '@global';
import type { Post } from '../../types';
import Avatar from '../avatar.component';

interface PostItemProps extends ReactProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  const { formatTime } = useFormat();

  return (
    <div
      className={clsx(
        'w-full my-5',
        'rounded-lg shadow-md',
        'bg-surface/[0.87] dark:bg-dark-surface/[0.07]',
      )}
      key={post.id}
    >
      <header className={clsx('p-4 pb-0', 'flex', 'relative')}>
        <Avatar image={post.avatar} />

        <div className={clsx('ml-3', 'flex items-center')}>
          <Link
            className={clsx('block', 'font-semibold text-lg')}
            to={`/profile/${post.uid}`}
            // onClick={() => setLink('profile')}
          >
            {post.username}
          </Link>
          <span className="mx-2 text-2xl">&middot;</span>
          <span
            className={clsx(
              'block',
              'text-on-surface/[0.6] dark:text-dark-on-surface/[0.6]',
            )}
          >
            {formatTime(post.createdAt!)}
          </span>
        </div>

        <button
          className={clsx('p-3', 'absolute top-4 right-4')}
          onClick={() => {
            // setShowActionMenu(true);
            // setCurrentPost(post);
          }}
          aria-label="post-menu"
        >
          <EllipsisIcon
            className={clsx(
              'w-5 h-5',
              'fill-on-surface/[0.87] dark:fill-dark-on-surface/[0.87]',
            )}
          />
        </button>
      </header>

      <div
        className={clsx(
          // post.files.orientation === 'portrait' && 'max-h-screen h-160',
          'my-4',
          'flex justify-center',
          'bg-on-surface/[0.1] dark:bg-dark-on-surface/[0.07]',
        )}
        // onClick={() => {
        //   setCurrentPost(post);
        //   setShowCurrentPost(true);
        // }}
      >
        <LazyLoadImage
          className={
            // post.files.orientation === 'landscape'
            // ? 'h-auto w-full'
            // : 'h-full w-auto'
            'h-full w-auto'
          }
          alt="profile"
          // src={post.files.url}
          // src={uri.transformImageCDN(post.file.url, 'h_584,f_auto')}
        />
      </div>

      <main>
        <div className={clsx('flex items-center', 'px-4')}>
          <HeartIcon
            className={clsx(
              'w-7 h-7',
              'fill-love',
              'cursor-pointer',
              'hover:opacity-70 transition-opacity',
            )}
          />
          <span className={clsx('inline-block ml-3')}>
            {post.likes?.length} likes
          </span>
        </div>

        <Link
          className={clsx(
            'relative -left-2',
            'inline-block',
            'p-2 mt-4 mb-3 min-w-20',
            'font-semibold text-on-primary text-center',
            'bg-primary/[0.7] dark:bg-dark-primary/[0.7]',
            'hover:bg-primary/[0.8] dark:hover:bg-dark-primary/[0.8]',
            'transition-colors',
          )}
          to={`/profile/${post.username}`}
          // onClick={() => setLink('profile')}
        >
          {post.username}
        </Link>

        {post.content && <p className={clsx('block px-4')}>{post.content}</p>}
      </main>

      <footer className="mt-4">
        {post.comments?.length! > 0 && (
          <p
            role="button"
            // className={clsx(styles['comment-link'], 'd-block p-0 pb-2')}
            // onClick={() => {
            //   setCurrentPost(post);
            //   setShowCurrentPost(true);
            // }}
            aria-label="view-comments"
          >
            View all {post.comments?.length} comments
          </p>
        )}
        <form
          // onSubmit={onComment}
          className={clsx('flex justify-between items-center', 'w-full')}
        >
          <textarea
            name="comment"
            className={clsx(
              'grow',
              'p-3',
              'bg-transparent',
              'outline-none resize-none',
            )}
            placeholder="Add a comment..."
            rows={1}
            spellCheck={false}
          />
          <button
            type="submit"
            // onClick={() => setCurrentPost(post)}
            className={clsx(
              'h-full ml-3 p-3',
              'text-primary font-bold',
              'hover:opacity-70 transition-opacity',
            )}
          >
            Post
          </button>
        </form>
      </footer>
    </div>
  );
};

export default PostItem;
