import { ChangeEvent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToggle } from 'usehooks-ts';
import clsx from 'clsx';

import { id, toast, Overlay, Loader } from '@global';
import { useAuthenticationContext } from '@authentication';
import { uploadPost } from '../../../api';
import { FilesProvider, useFilesContext } from '../../../providers';
import { useCloudinaryContext } from '../../../database/cloudinary.database';
import FileUploadArea from './file-upload-area.component';

import type { UploadedFile, PostData, PostUploadData } from '../../../types';
import type { ReactProps } from '@global';

interface UploadPostWindowProps extends ReactProps {
  exitHandler: () => void;
  method: 'post' | 'put';
  defaultPost?: PostUploadData;
}

const UploadPostWindow = ({
  exitHandler,
  method,
  defaultPost = { content: '', files: [] },
}: UploadPostWindowProps) => {
  const [loading, toggleLoading] = useToggle(false);
  const { files, addFile, isEmpty } = useFilesContext();
  const fileUploadHandler = (file: File) => {
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
          addFile({
            id: id.generate(),
            url: img.src,
            orientation,
            type: file.type,
          } as UploadedFile);
        };
      } else if (fileType === 'video') {
        const video = document.createElement('video');
        video.src = event.target!.result as string;
        video.onloadedmetadata = () => {
          const orientation =
            video.videoWidth > video.videoHeight
              ? 'landscape'
              : video.videoWidth < video.videoHeight
              ? 'portrait'
              : 'square';
          addFile({
            id: id.generate(),
            url: video.src,
            orientation,
            type: file.type,
          } as UploadedFile);
        };
      }
    };
    reader.readAsDataURL(file);
  };

  const { user } = useAuthenticationContext();
  const { register, handleSubmit } = useForm({ defaultValues: defaultPost });
  const { uploadFile } = useCloudinaryContext();
  const submitForm: SubmitHandler<Pick<PostUploadData, 'content'>> = async (
    data,
  ) => {
    try {
      toggleLoading();
      const postData: PostUploadData = {
        content: data.content,
        files: await uploadFile(files, {
          asset_folder: user!.username,
          public_id_prefix: user!.username,
        }),
      };
      const response = await uploadPost(postData, method);
      toggleLoading();
      if (response.success) {
        exitHandler();
        toast.success(response.message);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Overlay exitHandler={exitHandler}>
      <div
        className={clsx(
          'relative',
          isEmpty() && 'aspect-square',
          'max-w-screen h-4/5 min-w-fit',
          'rounded-xl overflow-hidden',
          'bg-background dark:bg-neutral-800',
        )}
      >
        <h3
          className={clsx(
            'py-3 border-b border-on-background/[.2] dark:border-dark-on-surface/[.2]',
            'font-semibold text-center capitalize',
            'text-on-background dark:text-dark-on-background/[0.87]',
          )}
        >
          create new post
        </h3>
        <form
          className={clsx('flex grow', 'h-[calc(100%-3rem)]')}
          onSubmit={handleSubmit(submitForm)}
        >
          {/* Drop zone */}
          <div
            className={clsx(
              'h-full relative',
              isEmpty() ? 'w-full' : 'aspect-square',
            )}
          >
            <div className="h-full w-full">
              {loading ? (
                <div
                  className={clsx(
                    'flex justify-center items-center gap-x-3',
                    'h-full w-full',
                  )}
                >
                  <Loader.Regular />
                  <span
                    className={clsx(
                      'text-xl font-medium',
                      'text-on-background dark:text-dark-on-background',
                    )}
                  >
                    Loading
                  </span>
                </div>
              ) : (
                <FileUploadArea fileUploadHandler={fileUploadHandler} />
              )}
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  if (event.target.files)
                    fileUploadHandler(event.target.files[0]);
                  (function resetValue() {
                    event.target.value = '';
                  })();
                }}
              />
            </div>
          </div>

          {/* Content */}
          {!isEmpty() && !loading && (
            <>
              <div
                className={clsx(
                  'aspect-9/16 h-full',
                  'flex flex-col',
                  'overflow-hidden',
                )}
              >
                <textarea
                  className={clsx(
                    'w-full h-2/5 px-3 py-4',
                    'outline-none resize-none',
                    'text-on-surface dark:text-dark-on-surface',
                    'bg-surface dark:bg-dark-surface/[.07]',
                    'shadow-sm dark:shadow-none',
                    'dark:border-dark-surface/[0.2] dark:border-b',
                  )}
                  placeholder="What's on your mind?"
                  rows={3}
                  {...register('content')}
                />
                <button
                  type="submit"
                  className={clsx(
                    'self-end',
                    'simple-border-button',
                    'w-fit px-3 py-2 mt-4 mr-4',
                  )}
                >
                  Share
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </Overlay>
  );
};

export default ({
  exitHandler,
  method,
  defaultPost,
}: UploadPostWindowProps) => (
  <FilesProvider>
    <UploadPostWindow
      exitHandler={exitHandler}
      method={method}
      defaultPost={defaultPost}
    />
  </FilesProvider>
);
