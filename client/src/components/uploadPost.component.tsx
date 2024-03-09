import { Dispatch, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGlobal, useAuth, Overlay } from '@components';
import axios from 'axios';
import styles from '@sass/upload.module.sass';
import clsx from 'clsx';

function UploadPost({ closeFunction }: { closeFunction: Dispatch<boolean> }) {
  const { displayToast } = useGlobal();
  const { authentication } = useAuth();
  const { register, handleSubmit } = useForm();

  const submitForm = (data: any) => {
    closeFunction(false);
    const id = authentication.user!.id;
    const formData = new FormData();
    formData.append('file', data.file[0]);
    formData.append('content', data.content);
    formData.append('author', id!.toString());
    axios
      .post('/api/post/create', formData)
      .then((result: any) => displayToast(result.data.message, 'success'))
      .catch((error: any) => displayToast(error.response.data.message, 'error'));
  };

  type variable = string | ArrayBuffer | null;
  const [selectedImage, setSelectedImage] = useState<variable>(null);
  useEffect(() => {}, [selectedImage]);

  return (
    <Overlay closeFunction={closeFunction}>
      <div className={clsx(styles.frame, 'rounded')}>
        <h3 className={clsx(styles.header, 'm-0', 'text-center')}>Create new post</h3>
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
          <span className={clsx(styles.image, 'float-start', 'position-relative')}>
            {selectedImage && (
              <span className={clsx('w-100 h-100', 'position-relative start-0 top-0')}>
                <img
                  src={selectedImage as string}
                  className="d-block w-100 h-100 object-fit-contain"
                  alt="Preview"
                />
              </span>
            )}
            <input
              type="file"
              className={clsx('w-100 h-100', 'position-absolute top-0 start-0', 'opacity-0')}
              {...register('file', {
                onChange: (e) => {
                  console.log(e.target.files);
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setSelectedImage(event.target!.result);
                  };
                  reader.readAsDataURL(file);
                },
                required: true,
              })}
            />
          </span>
          <span className={clsx(styles.content, 'float-end')}>
            <textarea
              className="w-100"
              placeholder="What's on your mind?"
              rows={3}
              {...register('content', { required: true })}
            ></textarea>
            <button type="submit" className="btn btn-primary mt-3">
              Share
            </button>
          </span>
        </form>
      </div>
    </Overlay>
  );
}

export default UploadPost;
