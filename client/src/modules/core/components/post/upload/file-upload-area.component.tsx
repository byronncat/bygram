import { DragEvent, useState } from 'react';
import { useToggle } from 'usehooks-ts';
import clsx from 'clsx';

import { useFilesContext } from '../../../providers';
import Carousel from './carousel.component';
import {
  PhotoFilmIcon,
  CloneIcon,
  PlusIcon,
  CircleXMarkIcon,
} from '@assets/icons';
import type { ReactProps } from '@global';
import type { UploadedFile } from '../../../types';

interface FileUploadAreaProps extends ReactProps {
  fileUploadHandler: (file: File) => void;
}

const FileUploadArea = ({ fileUploadHandler }: FileUploadAreaProps) => {
  const [isDrag, setIsDrag] = useState(false);
  const [miniShow, toggleMiniShow] = useToggle(false);
  const { files, isEmpty } = useFilesContext();

  function dragOverHandler(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDrag(true);
  }
  function dragLeaveHandler() {
    setIsDrag(false);
  }
  function dropHandler(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    const files = event.dataTransfer.files;
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
      <DragZone />
    </div>
  ) : (
    <>
      <Carousel files={files} />
      <div className={clsx('absolute bottom-0 right-0 z-20', 'w-full p-3')}>
        <button
          type="button"
          className={clsx(
            'p-3',
            'float-right',
            'rounded-full bg-primary dark:bg-dark-primary',
            'cursor-pointer hover:opacity-80',
            'transition-all duration-200',
          )}
          onClick={toggleMiniShow}
        >
          <CloneIcon className={clsx('w-5 h-5', 'fill-on-primary')} />
        </button>
        {miniShow && <MiniNavigator />}
      </div>
    </>
  );
};

const DragZone = () => (
  <div
    className={clsx('flex flex-col items-center justify-center', 'pt-5 pb-6')}
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
);

const MiniNavigator = () => {
  const { files, removeFile } = useFilesContext();
  function propagationHandler(event: any) {
    event.stopPropagation();
  }

  return (
    <div
      className={clsx(
        'flex gap-x-2 items-center',
        'max-w-full w-fit h-28 p-2 my-3',
        'absolute bottom-full right-0 z-10',
        'bg-on-background/[0.6]',
        'rounded-md',
      )}
      onClick={propagationHandler}
    >
      <div
        className={clsx(
          'h-full',
          'overflow-x-scroll no-scrollbar',
          'flex items-center gap-x-2',
        )}
      >
        {files.map((file: UploadedFile) => (
          <div
            key={file.id}
            className={clsx(
              'relative',
              'h-24 w-24 min-w-24',
              'overflow-hidden',
            )}
          >
            {file.type.startsWith('image') ? (
              <img
                src={file.url}
                alt="uploaded file"
                className={clsx('h-full w-full object-cover', 'rounded-md')}
              />
            ) : (
              <video
                src={file.url}
                className={clsx('h-full w-full object-cover', 'rounded-md')}
              />
            )}
            <span
              className={clsx(
                'w-5 h-5 m-1',
                'block',
                'absolute top-0 right-0',
                'hover:opacity-60',
                'cursor-pointer transition-all duration-200',
              )}
              onClick={() => removeFile(file.id)}
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
      </div>
      <label
        htmlFor="dropzone-file"
        className={clsx(
          'p-2 h-fit',
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
