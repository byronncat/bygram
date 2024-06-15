import axios, { AxiosResponse } from 'axios';
import { uri, API } from '@global';
import { Post, Comment, CommentAPI, PostAPI, PostUploadData } from '../types';

export async function deletePost(postID: Post['id']): Promise<API> {
  return await axios
    .delete(uri.getHostingServer(`post/${postID}`))
    .then((res: any) => res.data)
    .catch((err: any) => err.response.data);
}

export async function uploadPost(
  postData: PostUploadData,
  method: 'post' | 'put',
): Promise<API> {
  const formData = new FormData();
  if (postData.id) formData.append('id', postData.id);
  if (postData.uid) formData.append('uid', postData.uid.toString());
  if (postData.content) formData.append('content', postData.content);
  if (postData.file) formData.append('file', postData.file);
  return await axios[method](uri.getHostingServer('post'), formData)
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}

type UserToken = { id: number };

export async function explorePost(id: UserToken['id']): Promise<PostAPI> {
  return await axios
    .get(uri.getHostingServer('post/explore'), { params: { uid: id } })
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}

export async function getHomePosts(id: UserToken['id']): Promise<PostAPI> {
  return await axios
    .get(uri.getHostingServer('post/home'), { params: { uid: id } })
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}

export async function likePost(
  uid: UserToken['id'],
  postID: Post['id'],
): Promise<API> {
  return await axios
    .post(uri.getHostingServer('post/like'), { uid, postID })
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}

export async function sendComment(
  uid: UserToken['id'],
  postID: Post['id'],
  content: string,
): Promise<API> {
  return await axios
    .post(uri.getHostingServer('post/comment'), { uid, postID, content })
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}

export async function getComments(postID: Post['id']): Promise<CommentAPI> {
  return await axios
    .get(uri.getHostingServer(`post/comment/${postID}`))
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}

export async function deleteComment(
  postID: Post['id'],
  commentID: Comment['id'],
): Promise<API> {
  return await axios
    .delete(uri.getHostingServer(`post/comment`), {
      data: { postID, commentID },
    })
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}
