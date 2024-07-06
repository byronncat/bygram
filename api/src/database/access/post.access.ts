import { logger } from '@utilities';
import { PostModel } from '../models';
import type { Post, PostUploadData } from '@types';

export async function createPost(
  uid: Post['uid'],
  data: PostUploadData,
): Promise<Post> {
  try {
    const post = new PostModel({ uid, ...data });
    await post.save();
    return post;
  } catch (error) {
    logger.error(JSON.stringify(error), 'Post Access (Create Post)');
    throw error;
  }
}

export async function getPostByUIDs(uids: Post['uid'][]): Promise<Post[]> {
  try {
    return await PostModel.find({ uid: { $in: uids } });
  } catch (error) {
    logger.error(JSON.stringify(error), 'Post Access (Get Post By UIDs)');
    throw error;
  }
}
