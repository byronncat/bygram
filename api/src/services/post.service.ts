// import mongoose from 'mongoose';
// import { accountService, fileService } from '@services';
// import { isEmptyObject, logger } from '@utilities';
import { createPost } from '@/database/access';
// import { Account, PostData, , CommentData } from '@types';
import { Account, PostUploadData, Post } from '@types';

// interface PostQuery extends Omit<Post, 'uid'> {
//   uid?: Account['id'] | Account['id'][];
// }

// async function getManyByID(post: PostQuery): Promise<PostData[]> {
//   try {
//     const posts = await PostModel.find({
//       ...post,
//       uid: { $in: post.uid },
//     }).sort({
//       createdAt: -1,
//     });

//     return await Promise.all(
//       posts.map(async (post: PostDocument) => {
//         const profile = await accountService.getProfileByID(post.uid);
//         if (!profile) return Promise.reject('Profile not found');
//         if (!post.file) return Promise.reject('File not found');
//         return {
//           id: post._id.toString(),
//           uid: post.uid,
//           username: profile.username,
//           avatar: isEmptyObject(profile.avatar) ? undefined : profile.avatar,
//           content: post.content,
//           file: post.file,
//           createdAt: post.createdAt,
//           likes: post.likes,
//           comments: post.comments,
//         } as PostData;
//       }),
//     );
//   } catch (error) {
//     logger.error(`${error}`, 'Post service');
//     return Promise.reject(error);
//   }
// }

async function create(
  uid: Account['id'],
  postData: PostUploadData,
): Promise<Post> {
  return await createPost(uid, postData);
}

// async function updateByID(
//   postId: PostData['id'],
//   post: PostData,
//   file: Express.Multer.File | undefined,
// ): Promise<PostDocument | null> {
//   const _id = new mongoose.Types.ObjectId(postId);
//   if (file) {
//     const oldFile = (await PostModel.findById(_id)
//       .select('file')
//       .catch((error) => Promise.reject(error))) as PostDocument;
//     if (!oldFile) return Promise.reject('Post not found');
//     const fileUpload = await fileService
//       .replaceImage(file, oldFile.file!.dataURL!)
//       .catch((error) => Promise.reject(error));
//     post.file = {
//       dataURL: fileUpload.secure_url,
//       sizeType: fileUpload.sizeType,
//     };
//   }
//   return await PostModel.findByIdAndUpdate(_id, post);
// }

// async function removeByID(
//   postId: PostData['id'],
// ): Promise<PostDocument | null> {
//   const deletedPost = await PostModel.findById(postId);
//   if (!deletedPost) return Promise.reject('Post not found');
//   const success = await fileService.deleteImage(deletedPost.file!.dataURL!);
//   if (!success) return Promise.reject('Image deletion failed');
//   return await PostModel.findByIdAndDelete(postId);
// }

// async function exploreByID(id: Account['id']): Promise<PostData[]> {
//   if (!id) return Promise.reject('No user id provided');
//   const followings = await accountService.getFollowingsByID(id);
//   const posts = await PostModel.aggregate([
//     { $match: { uid: { $nin: [...followings!, +id] } } },
//     { $sample: { size: 100 } },
//   ]);
//   return await Promise.all(
//     posts.map(async (post: PostDocument) => {
//       const profile = await accountService.getProfileByID(post.uid);
//       if (!profile) return Promise.reject('Profile not found');
//       return {
//         id: post._id.toString(),
//         uid: post.uid,
//         username: profile.username,
//         avatar: isEmptyObject(profile.avatar) ? undefined : profile.avatar,
//         content: post.content,
//         file: post.file,
//         createdAt: post.createdAt,
//         likes: post.likes,
//         comments: post.comments,
//       } as PostData;
//     }),
//   );
// }

// async function likeByID(
//   uid: Account['id'],
//   postId: PostData['id'],
// ): Promise<PostDocument | null> {
//   const post = await PostModel.findById(postId).catch((error) =>
//     Promise.reject(error),
//   );
//   if (!post) return Promise.reject('Post not found');
//   const liked = post.likes!.includes(uid);
//   if (liked) post.likes = post.likes!.filter((id) => id !== uid);
//   else post.likes!.push(uid);
//   return await post.save();
// }

// async function addCommentByID(
//   uid: Account['id'],
//   postId: PostData['id'],
//   content: Post['comments'],
// ): Promise<PostDocument | null> {
//   const post = await PostModel.findById(postId).catch((error) =>
//     Promise.reject(error),
//   );
//   if (!post) return Promise.reject('Post not found');
//   post.comments!.push({ uid, content });
//   return await post.save();
// }

// async function getCommentsByID(
//   postId: PostData['id'],
// ): Promise<CommentData[] | null> {
//   const post = await PostModel.findById(postId).select('comments');
//   if (!post) return Promise.reject('Post not found');
//   return await Promise.all(
//     post.comments!.map(async (comment) => {
//       const profile = await accountService.getProfileByID(comment.uid);
//       if (!profile) return Promise.reject('Profile not found');
//       return {
//         id: comment._id.toString(),
//         uid: comment.uid,
//         username: profile.username,
//         avatar: isEmptyObject(profile.avatar) ? undefined : profile.avatar,
//         content: comment.content,
//         createdAt: comment.createdAt,
//       };
//     }),
//   );
// }

// async function removeCommentByID(
//   postId: PostData['id'],
//   commentId: CommentData['id'],
// ): Promise<PostDocument | null> {
//   const post = await PostModel.findById(postId).catch((error) =>
//     Promise.reject(error),
//   );
//   if (!post) return Promise.reject('Post not found');
//   post.comments = post.comments!.filter((comment) => comment._id != commentId);
//   return await post.save();
// }

export default {
  //   getManyByID,
  create,
  //   updateByID,
  //   removeByID,
  //   exploreByID,
  //   likeByID,
  //   addCommentByID,
  //   getCommentsByID,
  //   removeCommentByID,
};
