import { useEffect, useLayoutEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { toast, useGlobalContext, Overlay, ReactProps } from '@global';
import { uploadPost } from '../services/post.service';
import { PostData } from '../types';
import styles from '../styles/components/upload-post-window.module.sass';

interface PostSubmitData {
  file: FileList;
  content: string;
}

interface UploadPostWindowProps extends ReactProps {
  method: 'post' | 'put';
  defaultPost?: PostData;
}
export default function UploadPostWindow({
  onExit,
  method,
  defaultPost,
  zIndex = 1,
}: UploadPostWindowProps) {
  const defaultValues = {
    content: defaultPost?.content || '',
  } as PostSubmitData;
  type Image = {
    imgURL: string | ArrayBuffer | null;
    sizeType: 'landscape' | 'portrait';
  };
  const [selectedImage, setSelectedImage] = useState<Image>({
    imgURL: null,
    sizeType: 'portrait',
  });
  const { refreshPage } = useGlobalContext();

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
    if (onExit) onExit();
    let postData =
      method === 'post'
        ? {
            uid: authenticationStorage.identity!.id,
            content: data.content,
            file: data.file[0] as File,
          }
        : {
            id: defaultPost!.id,
            content: data.content,
            file: data.file[0] as File,
          };
    const response = await uploadPost(postData, method);
    refreshPage();
    toast.display(response.message, response.success ? 'success' : 'error');
  };

  useLayoutEffect(() => {
    if (defaultPost) {
      setSelectedImage({
        imgURL: defaultPost.file.dataURL,
        sizeType: defaultPost.file.sizeType,
      });
    }
  }, [defaultPost]);

  useEffect(() => {
    if (errors.file) toast.display('Please select an image', 'error');
  }, [errors.file]);

  return (
    <Overlay exitHandler={() => onExit} zIndex={zIndex}>
      <div
        className={clsx(
          styles.frame,
          'rounded',
          'd-flex flex-column',
          'mw-100',
          'position-relative',
        )}
      >
        <h3
          className={clsx(styles.header, 'm-0', 'text-center text-capitalize')}
        >
          create new post
        </h3>
        <form
          className={clsx(styles['form-wraper'], 'flex-fill', 'w-100')}
          onSubmit={handleSubmit(submitForm)}
        >
          <div
            className={clsx(
              styles['image-wrapper'],
              'float-start position-relative h-100',
            )}
          >
            <span
              className={clsx(
                styles.image,
                'w-100 h-100',
                'd-flex justify-content-center align-items-center',
                'position-relative start-0 top-0',
                'd-block',
              )}
            >
              {selectedImage.imgURL ? (
                <img
                  src={selectedImage.imgURL as string}
                  className={clsx(
                    'd-block',
                    selectedImage.sizeType === 'landscape'
                      ? 'w-100 h-auto'
                      : 'w-auto h-100',
                  )}
                  alt="preview"
                />
              ) : (
                <p className={clsx(styles['help-text'])}>
                  Drag file or Click to upload image
                </p>
              )}
            </span>
            <input
              type="file"
              className={clsx(
                'w-100 h-100',
                'position-absolute top-0 start-0',
                'opacity-0',
              )}
              {...register('file', {
                onChange: (e) => {
                  if (e.target.files.length > 0) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const img = new Image();
                      img.src = event.target!.result as string;
                      img.onload = () => {
                        const sizeType =
                          img.width > img.height ? 'landscape' : 'portrait';
                        setSelectedImage({ imgURL: img.src, sizeType });
                      };
                    };
                    reader.readAsDataURL(file);
                  }
                },
                required: method === 'post',
              })}
            />
          </div>
          <div className={clsx(styles.content, 'float-end', 'h-100')}>
            <textarea
              className={clsx(styles['text-zone'], 'w-100 h-50 px-2 py-3')}
              placeholder="What's on your mind?"
              rows={3}
              {...register('content')}
            ></textarea>
            <button
              type="submit"
              className={clsx(
                styles.submit,
                'position-absolute top-0 end-0',
                'pe-3',
                'fs-5',
              )}
            >
              Share
            </button>
          </div>
        </form>
      </div>
    </Overlay>
  );
}
