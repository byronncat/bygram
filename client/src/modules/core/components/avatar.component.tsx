import { LazyLoadImage } from 'react-lazy-load-image-component';
import clsx from 'clsx';
import type { MediaInfo } from '../types';

interface AvatarProps {
  image?: MediaInfo;
}

const Avatar = ({ image }: AvatarProps) => {
  return (
    <div
      className={clsx(
        'w-16 h-16',
        'rounded-full overflow-hidden',
        'flex justify-center items-center',
        'border-2 border-primary dark:border-dark-primary',
      )}
    >
      <div className="w-14 h-14 rounded-full overflow-hidden">
        <LazyLoadImage
          className={clsx(
            image?.orientation === 'portrait'
              ? 'w-full h-auto'
              : 'w-auto h-full',
          )}
          alt="profile"
          src={image?.url}
        />
      </div>
    </div>
  );
};

export default Avatar;
