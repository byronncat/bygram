import { useState } from 'react';
import clsx from 'clsx';

import Carousel from './carousel.component';
import { useFilesContext } from '@/modules/core/providers';
import {
  PhotoFilmIcon,
  CloneIcon,
  PlusIcon,
  CircleXMarkIcon,
} from '@assets/icons';
import type { ReactProps } from '@global';
import type { UploadedFile } from '@/modules/core/types';

interface DropzoneProps extends ReactProps {
  fileUploadHandler: (file: File) => void;
}

const FileUploadArea = ({ fileUploadHandler }: DropzoneProps) => {
  const [isDrag, setIsDrag] = useState(false);
  const { files, isEmpty } = useFilesContext();
  console.log(files);
  function dragOverHandler(e: any) {
    e.preventDefault();
    setIsDrag(true);
  }
  function dragLeaveHandler() {
    setIsDrag(false);
  }
  function dropHandler(e: any) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) fileUploadHandler(files[0]);
    setIsDrag(false);
  }

  return isEmpty() ? (
    <div
      className={clsx(
        'flex items-center justify-center',
        'w-full h-full',
        'relative',
      )}
    >
      <label
        onDragOver={dragOverHandler}
        onDragLeave={dragLeaveHandler}
        onDrop={dropHandler}
        htmlFor="dropzone-file"
        className={clsx(
          'absolute top-0 start-0',
          'flex flex-col items-center justify-center',
          'w-full h-full',
          'cursor-pointer ',
          'hover:bg-on-background/[.12] dark:hover:bg-dark-on-background/[.05]',
          'transition-all duration-200',
          isDrag && 'bg-on-background/[.12] dark:bg-dark-on-background/[.05]',
        )}
      />
      <div
        className={clsx(
          'flex flex-col items-center justify-center',
          'pt-5 pb-6',
        )}
      >
        <PhotoFilmIcon
          className={clsx(
            'w-16 h-16',
            'fill-on-background/[.4] dark:fill-dark-on-background/[.4]',
          )}
        />
        <p
          className={clsx(
            'mt-5',
            'text-center text-on-background/[.4] dark:text-dark-on-background/[.4]',
          )}
        >
          <span className="font-semibold">Drag photos and videos here</span>
          <br />
          or click to upload
        </p>
      </div>
    </div>
  ) : (
    <>
      <Carousel files={files} />
      <div
        className={clsx(
          'absolute bottom-0 right-0 z-20',
          'p-3 m-3',
          'rounded-full bg-primary dark:bg-dark-primary',
          'cursor-pointer hover:opacity-80',
          'transition-all duration-200',
        )}
      >
        <CloneIcon className={clsx('w-5 h-5', 'fill-on-primary')} />
      </div>
      <MiniNavigator />
    </>
  );
};

const MiniNavigator = () => {
  const { files } = useFilesContext();

  return (
    <div
      className={clsx(
        'flex gap-x-2',
        'w-fit h-28 p-2 mx-4',
        'absolute top-0 right-0 z-10',
        'bg-on-background/[0.6]',
        'rounded-md',
        'flex items-center justify-center',
      )}
    >
      {files.map((file: UploadedFile) => (
        <div
          className={clsx(
            'relative',
            'h-full aspect-square',
            'overflow-hidden',
          )}
        >
          <img
            src={file.url}
            alt="uploaded file"
            className={clsx('h-full w-full object-cover', 'rounded-md')}
          />
          <span
            className={clsx(
              'w-5 h-5 m-1',
              'block',
              'absolute top-0 right-0',
              'hover:opacity-60',
              'cursor-pointer transition-all duration-200',
            )}
            onClick={() => console.log('delete file')}
          >
            <CircleXMarkIcon
              className={clsx(
                'w-full h-full',
                'fill-primary/[.87] dark:fill-dark-primary/[.87]',
              )}
            />
          </span>
        </div>
      ))}
      <label
        htmlFor="dropzone-file"
        className={clsx(
          'p-2',
          'rounded-full bg-primary dark:bg-dark-primary',
          'cursor-pointer hover:opacity-80',
          'transition-all duration-200',
        )}
      >
        <PlusIcon className={clsx('w-5 h-5', 'fill-on-primary')} />
      </label>
    </div>
  );
};

export default FileUploadArea;
