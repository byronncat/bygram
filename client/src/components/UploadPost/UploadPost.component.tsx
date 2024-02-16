import axios from "axios";
import "./uploadPost.sass";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Authentication/Authentication.component";

function UploadPost({ closeFunction }: { closeFunction: Dispatch<boolean> }) {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const { authentication } = useAuth();

  const submitForm = (data: any) => {
    const id = authentication.user!.id;
    const formData = new FormData();
    console.log(authentication);
    formData.append("file", data.file[0]);
    formData.append("content", data.content);
    formData.append("author", id!.toString());
    axios.post("/api/post/create", formData);
  };

  return (
    <div data-bs-theme="dark" className="upload-post-wrapper position-absolute top-0 start-0 z-3 ">
      <span className="overlay position-absolute top-0 start-0 bg-black opacity-50" />
      <button
        type="button"
        className="btn-close position-absolute top-0 end-0 p-4"
        aria-label="Close"
        onClick={() => closeFunction(false)}
      ></button>
      <div className="upload-post position-absolute top-50 start-50 translate-middle">
        <h3 className="upload-post-header m-0 text-center">Create new post</h3>
        <form onSubmit={handleSubmit(submitForm)}>
          <input type="file" className="form-control upload-post-image float-start" {...register("file", { required: true })} />
          <span className="upload-post-content float-end">
            <textarea
              className="form-control"
              placeholder="What's on your mind?"
              rows={3}
              {...register("content", { required: true })}
            ></textarea>
            <button type="submit" className="btn btn-primary mt-3">
              Share
            </button>
          </span>
        </form>

      </div>
    </div>
  );
}

export default UploadPost;
