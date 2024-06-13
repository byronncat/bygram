import axios from 'axios';
import { uri } from '@global';
import type { API_v1 } from '@global';
import type { PostUploadData } from '../types';
import type { AxiosResponse } from 'axios';

export async function uploadPost(
  postData: PostUploadData,
  method: 'post' | 'put',
): Promise<API_v1> {
  const formData = new FormData();
  if (postData.id) formData.append('id', postData.id);
  if (postData.uid) formData.append('uid', postData.uid.toString());
  if (postData.content) formData.append('content', postData.content);
  if (postData.file) formData.append('file', postData.file);
  return await axios[method](uri.getHostingServer('post'), formData)
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}
