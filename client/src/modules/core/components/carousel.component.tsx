import { useEffect, useState } from 'react';
import clsx from 'clsx';
import type { FileData } from '../types';
import type { ReactProps } from '@global';

interface CarouselProps extends ReactProps {
  images: any[];
}
export default function Carousel({ images }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);

  function goToSlide(index: number) {
    const newIndex =
      index >= images.length ? 0 : index < 0 ? images.length - 1 : index;
    setActiveIndex(newIndex);
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     goToSlide(activeIndex + 1);
  //     setDirection('next');
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [activeIndex]);

  // TODO: Implement auto slide
  return (
    <div className={clsx('h-full w-full', 'relative overflow-hidden')}>
      {images.map((image, index) => (
        <div
          key={image.url}
          className={clsx(
            'h-full w-full bg-neutral-900',
            'duration-700 ease-in-out',
            index === activeIndex && 'absolute opacity-100',
            'hidden opacity-0',
          )}
          style={{
            display: index === activeIndex ? 'block' : 'none',
          }}
        >
          {image.type === 'video' ? (
            <video
              src={image.url}
              className={clsx(
                'block',
                'absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2',
              )}
              autoPlay
              loop
              muted
              playsInline
            ></video>
          ) : (
            <img
              src={image.url}
              className={clsx(
                'block',
                'absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2',
                image.orientation === 'landscape'
                  ? 'w-full h-auto'
                  : 'w-auto h-full',
              )}
              alt="post-image"
            />
          )}
        </div>
      ))}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current={index === activeIndex}
            aria-label={`image ${index + 1}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={() => {
          goToSlide(activeIndex - 1);
          setDirection('prev');
        }}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={() => {
          goToSlide(activeIndex + 1);
          setDirection('next');
        }}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}
