import axios, { AxiosResponse } from 'axios';
import { API, Post, PostAPI, UserToken, PostUploadData, CommentAPI, Comment } from '@types';

export async function deletePost(postID: Post['id']): Promise<API> {
  return await axios
    .delete(`/api/post/${postID}`)
    .then((res: any) => res.data)
    .catch((err: any) => err.response.data);
}

export async function uploadPost(postData: PostUploadData, method: 'post' | 'put'): Promise<API> {
  const formData = new FormData();
  if (postData.id) formData.append('id', postData.id);
  if (postData.uid) formData.append('uid', postData.uid.toString());
  if (postData.content) formData.append('content', postData.content);
  if (postData.file) formData.append('file', postData.file);
  return await axios[method]('/api/post', formData)
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}

export async function explorePost(id: UserToken['id']): Promise<PostAPI> {
  return await axios
    .get('/api/post/explore', { params: { uid: id } })
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}

export async function getHomePosts(id: UserToken['id']): Promise<PostAPI> {
  return await axios
    .get('/api/post/home', { params: { uid: id } })
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}

export async function likePost(uid: UserToken['id'], postID: Post['id']): Promise<API> {
  return await axios
    .post('/api/post/like', { uid, postID })
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}

export async function sendComment(
  uid: UserToken['id'],
  postID: Post['id'],
  content: string
): Promise<API> {
  return await axios
    .post('/api/post/comment', { uid, postID, content })
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}

export async function getComments(postID: Post['id']): Promise<CommentAPI> {
  return await axios
    .get(`/api/post/comment/${postID}`)
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}

export async function deleteComment(postID: Post['id'], commentID: Comment['id']): Promise<API> {
  return await axios
    .delete(`/api/post/comment`, { data: { postID, commentID } })
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}
