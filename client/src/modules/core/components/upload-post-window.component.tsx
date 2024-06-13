import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';

import { toast, useGlobalContext, Overlay } from '@global';
import { uploadPost } from '../api';
import styles from '../styles/components/upload-post-window.module.sass';
import { PhotoFilmIcon } from '@/assets/icons';
import type { FileData, PostData } from '../types';
import type { ReactProps } from '@global';
import Carousel from './carousel.component';

interface PostSubmitData {
  files: FileList;
  content: string;
}

type DeviceFile = {
  url: string | ArrayBuffer | null;
} & FileData;

interface UploadPostWindowProps extends ReactProps {
  exitHandler: () => void;
  method: 'post' | 'put';
  defaultPost?: PostData;
}
export default function UploadPostWindow({
  exitHandler,
  method,
  defaultPost,
}: UploadPostWindowProps) {
  const defaultValues = {
    content: defaultPost?.content || '',
  } as PostSubmitData;

  const [images, setImages] = useState<any[]>([]);

  function isImagesEmpty() {
    return images.length === 0;
  }

  const fileUploadHandler = useCallback(
    (file: File) => {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileType = file.type.split('/')[0];
        if (fileType === 'image') {
          const img = new Image();
          img.src = event.target!.result as string;
          img.onload = () => {
            const orientation =
              img.width > img.height
                ? 'landscape'
                : img.width < img.height
                ? 'portrait'
                : 'square';
            setImages((currentImages) => [
              ...currentImages,
              {
                url: img.src,
                orientation,
                type: file.type,
              },
            ]);
          };
        } else if (fileType === 'video') {
          console.log(event.target!.result);
          setImages((currentImages) => [
            ...currentImages,
            {
              url: event.target!.result,
              orientation: 'landscape',
              type: 'video',
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    },
    [setImages],
  );

  const [isDrag, setIsDrag] = useState(false);
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

  // temp
  const authenticationStorage = {
    identity: {
      id: 32,
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const submitForm: SubmitHandler<PostSubmitData> = async (data) => {
    console.log(data.files[0]);
    // if (exitHandler) exitHandler();
    // let postData =
    //   method === 'post'
    //     ? {
    //         uid: authenticationStorage.identity!.id,
    //         content: data.content,
    //         file: data.file[0] as File,
    //       }
    //     : {
    //         id: defaultPost!.id,
    //         content: data.content,
    //         file: data.file[0] as File,
    //       };
    // const response = await uploadPost(postData, method);
    // refreshPage();
    // toast.display(response.message, response.success ? 'success' : 'error');
  };

  useLayoutEffect(() => {
    // if (defaultPost) {
    //   setSelectedImage({
    //     imgURL: defaultPost.file.url,
    //     sizeType: defaultPost.file.orientation,
    //   });
    // }
  }, [defaultPost]);

  useEffect(() => {
    // if (errors.files) toast.display('Please select an image', 'error');
  }, [errors.files]);

  return (
    <Overlay exitHandler={exitHandler} zIndex={2}>
      <div
        className={clsx(
          styles.frame,
          'flex flex-col',
          'max-w-screen w-190 max-h-screen h-4/5',
          'relative overflow-hidden',
          'rounded-xl',
          'bg-neutral-800',
        )}
      >
        <h3
          className={clsx(
            'py-3 border-b border-white/[.2]',
            'font-semibold text-center capitalize',
          )}
        >
          create new post
        </h3>
        <form
          className={clsx('flex-fill', 'w-full h-full')}
          onSubmit={handleSubmit(submitForm)}
        >
          {/* <div
            className={clsx(
              styles['image-wrapper'],
              'float-start relative h-full',
            )}
          > */}
          <div className="w-full h-full">
            {isImagesEmpty() ? (
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
                    'hover:bg-white/[.1] hover:shadow',
                    isDrag && 'bg-white/[.1] shadow',
                  )}
                />
                <div
                  className={clsx(
                    'flex flex-col items-center justify-center',
                    'pt-5 pb-6',
                  )}
                >
                  <PhotoFilmIcon
                    className={clsx('w-16 h-16', 'fill-white/[.4]')}
                  />
                  <p className="mt-5 text-white/[.4] text-center">
                    <span className="font-semibold">
                      Drag photos and videos here
                    </span>
                    <br />
                    or click to upload
                  </p>
                </div>
              </div>
            ) : (
              <>
                <Carousel images={images} />
                <label
                  htmlFor="dropzone-file"
                  className={clsx(
                    'absolute top-0',
                    'p-2',
                    'text-white',
                    'bg-neutral-900',
                    'hover:bg-neutral-800',
                  )}
                >
                  Add
                </label>
                <button
                  type="submit"
                  className={clsx(
                    styles.submit,
                    'absolute top-0 right-0',
                    'pe-3',
                    'fs-5',
                  )}
                >
                  Share
                </button>
              </>
            )}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              {...register('files', {
                onChange: (e) => {
                  if (e.target.files) fileUploadHandler(e.target.files[0]);
                },
                required: method === 'post',
              })}
            />
          </div>
          <div className={clsx(styles.content, 'float-end', 'h-full')}>
            <textarea
              className={clsx(styles['text-zone'], 'w-100 h-50 px-2 py-3')}
              placeholder="What's on your mind?"
              rows={3}
              {...register('content')}
            ></textarea>
          </div>
        </form>
      </div>
    </Overlay>
  );
}
