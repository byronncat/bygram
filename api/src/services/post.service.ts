import { accountService, fileService } from '@services';
import { isEmptyObject, logger } from '@utils';
import { fileDB } from '@db';
import { PostModel, PostDocument } from '@db/schema.mongodb';
import { Account, Post } from '@types';
import { CloudinaryUploadResponse } from '@types';
import { PostData } from './types';
import { log } from 'console';

interface PostQuery extends Omit<Post, 'uid'> {
  uid?: Account['id'] | Account['id'][];
}

async function getManyByID(post: PostQuery): Promise<PostData[]> {
  try {
    const posts = await PostModel.find({ ...post, uid: { $in: post.uid } }).sort({
      createdAt: -1,
    });

    return await Promise.all(
      posts.map(async (post: PostDocument) => {
        const profile = await accountService.getProfileByID(post.uid);
        if (!profile) return Promise.reject('Profile not found');
        if (!post.file) return Promise.reject('File not found');
        return {
          id: post._id.toString(),
          uid: post.uid,
          username: profile.username,
          avatar: isEmptyObject(profile.avatar) ? undefined : profile.avatar,
          content: post.content,
          file: post.file,
          createdAt: post.createdAt,
          likes: post.likes,
          comments: post.comments,
        } as PostData;
      })
    );
  } catch (error) {
    logger.error(`${error}`, 'Post service');
    return Promise.reject(error);
  }
}

async function create(post: Post, file: Express.Multer.File): Promise<PostDocument | null> {
  const fileUpload = await fileService.addImage(file, post.uid);
  if (!fileUpload) return Promise.reject('Image upload failed');
  const returnValue = await PostModel.create({
    uid: post.uid,
    content: post.content,
    file: {
      dataURL: fileUpload.secure_url,
      sizeType: fileUpload.sizeType,
    },
  });
  return returnValue;
}

async function removeByID(postId: PostData['id']): Promise<PostDocument | null> {
  const deletedPost = await PostModel.findById(postId);
  if (!deletedPost) return Promise.reject('Post not found');

  const success = await fileService.deleteImage(deletedPost.file!.dataURL!);
  if (!success) return Promise.reject('Image deletion failed');

  return await PostModel.findByIdAndDelete(postId);
}

async function exploreByID(id: Account['id']): Promise<PostData[] | null> {
  if (!id) return Promise.reject('No user id provided');
  const followings = await accountService.getFollowingsByID(id);
  const posts = await PostModel.aggregate([
    { $match: { uid: { $nin: [...followings!, +id] } } },
    { $sample: { size: 100 } },
  ]);
  return await Promise.all(
    posts.map(async (post: PostDocument) => {
      const profile = await accountService.getProfileByID(post.uid);
      if (!profile) return Promise.reject('Profile not found');
      return {
        id: post._id.toString(),
        uid: post.uid,
        username: profile.username,
        avatar: isEmptyObject(profile.avatar) ? undefined : profile.avatar,
        content: post.content,
        file: post.file,
        createdAt: post.createdAt,
        likes: post.likes,
        comments: post.comments,
      } as PostData;
    })
  );
}

// ! Need to maintain

async function update(post: any) {
  return await PostModel.findByIdAndUpdate(post._id, post);
}

async function replaceImage(_id: any, imgURL: string) {
  return await PostModel.findByIdAndUpdate(_id, { imgURL });
}

export default {
  getManyByID,
  create,
  removeByID,
  exploreByID,
  // Test
  update,
  replaceImage,
};
