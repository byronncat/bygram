import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import { toast, useGlobalContext, Overlay } from '@global';
import { uploadPost } from '../../../api';
import FileUploadArea from './file-upload-area.component';
import type { UploadedFile, PostData } from '../../../types';
import type { ReactProps } from '@global';
import { FilesProvider, useFilesContext } from '../../../providers';

interface PostSubmitData {
  files: FileList;
  content: string;
}

interface UploadPostWindowProps extends ReactProps {
  exitHandler: () => void;
  method: 'post' | 'put';
  defaultPost?: PostData;
}
const UploadPostWindow = ({
  exitHandler,
  method,
  defaultPost,
}: UploadPostWindowProps) => {
  const defaultValues = {
    content: defaultPost?.content || '',
  } as PostSubmitData;

  const { files, addFile, isEmpty } = useFilesContext();

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
            addFile({
              id: nanoid(),
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
              id: nanoid(),
              url: video.src,
              orientation,
              type: file.type,
            } as UploadedFile);
          };
        }
      };
      reader.readAsDataURL(file);
    },
    [addFile],
  );

  const { register, handleSubmit } = useForm({ defaultValues });

  const submitForm: SubmitHandler<PostSubmitData> = async (data) => {
    exitHandler();
    console.log('test', data);
    console.log('test', files);
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
            <FileUploadArea fileUploadHandler={fileUploadHandler} />
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              {...register('files', {
                onChange: (e) => {
                  if (e.target.files) fileUploadHandler(e.target.files[0]);
                  (function resetValue() {
                    e.target.value = '';
                  })();
                },
                required: method === 'post',
              })}
            />
          </div>

          {/* Content */}
          {!isEmpty() && (
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
