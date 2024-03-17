import axios from 'axios';

export async function deletePost(postID: string) {
  let success = false;
  await axios
    .delete(`/api/post/delete/${postID}`)
    .then((res: any) => {
      success = true;
    })
    .catch((err: any) => {
      console.log(err);
    });

  return success;
}
