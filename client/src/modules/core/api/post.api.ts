import axios from 'axios';
import { uri } from '@global';
import type { API } from '@global';
import type { PostUploadData } from '../types';
import type { AxiosResponse } from 'axios';

export async function uploadPost(
  postData: PostUploadData,
  method: 'post' | 'put',
): Promise<API> {
  return await axios[method](uri.getHostingServer('post'), postData)
    .then((res: AxiosResponse) => res.data)
    .catch((err) => err.response.data);
}
