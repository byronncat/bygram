import { PostItem } from '../../components';
import type { ReactProps } from '@global';
import type { Post } from '../../types';
import clsx from 'clsx';

interface VerticalProps extends ReactProps {
  posts: Post[];
}

const Vertical = ({ posts }: VerticalProps) => {
  return (
    <div
      className={clsx(
        'max-w-180 w-full h-max py-5',
        'flex flex-col items-center gap-y-5',
      )}
    >
      {posts.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Vertical;
