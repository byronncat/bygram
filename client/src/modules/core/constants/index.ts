import { uploadPost } from '../api';
import { deletePost } from '../services/post.service';
import { PostData, PostUploadData, MenuItem } from '../types';
export * from './sidebar.constant';
export * from './default-values.constant';

export const AUTHOR_POST_MENU = [
  {
    name: 'Delete post',
    function: async (id: PostData['id']) => await deletePost(id),
  },
  {
    name: 'Edit',
    function: async (post: PostUploadData) => await uploadPost(post, 'put'),
  },
] as MenuItem[];

export const FOLLOWP_POST_MENU = [
  {
    name: 'Go to post',
  },
  {
    name: 'About this account',
  },
] as MenuItem[];

export const DEFAULT_AVATAR =
  'https://res.cloudinary.com/dq02xgn2g/image/upload/v1711784076/avatar-profile-pink-neon-icon-brick-wall-background-colour-neon-icon-vector_dcht0c.jpg';
