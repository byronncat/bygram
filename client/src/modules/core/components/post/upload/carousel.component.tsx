import { useRef, useState } from 'react';
import { animated, Controller } from '@react-spring/web';
import clsx from 'clsx';
import { CircleChevronIcon } from '@assets/icons';
import { useFilesContext } from '@/modules/core/providers';

import type { UploadedFile } from '@/modules/core/types';
import type { ReactProps } from '@global';

interface CarouselProps extends ReactProps {
  files: UploadedFile[];
}
const Carousel = ({ files }: CarouselProps) => {
  const { activeIndex, setActiveIndex } = useFilesContext();
  const slideStyle = useRef(new Controller());

  function slideEffect(direction: 'left' | 'right') {
    const oppositeDirection = direction === 'left' ? 'right' : 'left';
    slideStyle.current
      .start({
        from: {
          [direction]: '100%',
          [oppositeDirection]: 'unset',
          transform: 'translateX(0%)',
        },
        immediate: true,
      })
      .then(() => {
        slideStyle.current.start({
          to: {
            [direction]: '50%',
            transform: `translateX(${direction === 'left' ? '-' : ''}50%)`,
          },
          config: {
            duration: 300,
          },
        });
      });
  }

  function goToSlide(index: number) {
    const newIndex =
      index >= files.length ? 0 : index < 0 ? files.length - 1 : index;
    setActiveIndex(newIndex);
  }

  return (
    <div className={clsx('h-full w-full', 'relative', 'overflow-hidden')}>
      {files.map((file, index) => (
        <div
          key={file.id}
          className={clsx(
            'h-full w-full bg-on-background/[0.12] dark:bg-on-background/[0.42]',
            index === activeIndex && 'absolute opacity-100',
            'hidden opacity-0',
          )}
          style={{
            display: index === activeIndex ? 'block' : 'none',
          }}
        >
          <animated.div
            className={clsx(
              files.length > 1 && 'absolute top-0',
              'flex items-center justify-center',
              'w-full h-full',
            )}
            style={slideStyle.current.springs}
          >
            {file.type === 'video' ? (
              <video
                src={file.url}
                className={clsx('block')}
                autoPlay
                loop
                muted
                playsInline
              ></video>
            ) : (
              <img
                src={file.url}
                className={clsx(
                  'block',
                  file.orientation === 'landscape'
                    ? 'w-full h-auto'
                    : 'w-auto h-full',
                )}
                alt="post-file"
              />
            )}
          </animated.div>
        </div>
      ))}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
        {files.length > 1 &&
          files.map((_, index) => (
            <button
              key={_.id}
              type="button"
              className={clsx(
                'w-3 h-3 rounded-full',
                'transition-colors duration-300',
                index === activeIndex
                  ? 'bg-primary dark:bg-dark-primary'
                  : clsx(
                      'bg-primary/[.6] group-hover:bg-primary/[.87]',
                      'dark:bg-dark-primary/[.6] dark:group-hover:bg-dark-primary/[.87]',
                    ),
              )}
              aria-current={index === activeIndex}
              aria-label={`file ${index + 1}`}
              onClick={() => {
                if (index === activeIndex) return;
                goToSlide(index);
                slideEffect(index < activeIndex ? 'right' : 'left');
              }}
            />
          ))}
      </div>
      {files.length > 1 && (
        <>
          <button
            type="button"
            className={clsx(
              'absolute top-0 left-0 z-10',
              'flex items-center justify-center',
              'h-full px-4',
              'cursor-pointer group focus:outline-none',
            )}
            onClick={() => {
              goToSlide(activeIndex - 1);
              slideEffect('right');
            }}
          >
            <span className="sr-only">Previous</span>
            <CircleChevronIcon
              direction="left"
              className={clsx(
                'w-8 h-8',
                'fill-primary/[.6] group-hover:fill-primary/[.87]',
                'dark:fill-dark-primary/[.6] dark:group-hover:fill-dark-primary/[.87]',
                'transition-colors duration-300',
              )}
            />
          </button>
          <button
            type="button"
            className={clsx(
              'absolute top-0 right-0 z-10',
              'flex items-center justify-center',
              'h-full px-4',
              'cursor-pointer group focus:outline-none',
            )}
            onClick={() => {
              goToSlide(activeIndex + 1);
              slideEffect('left');
            }}
          >
            <span className="sr-only">Next</span>
            <CircleChevronIcon
              direction="right"
              className={clsx(
                'w-8 h-8',
                'fill-primary/[.6] group-hover:fill-primary/[.87]',
                'dark:fill-dark-primary/[.6] dark:group-hover:fill-dark-primary/[.87]',
                'transition-colors duration-300',
              )}
            />
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
