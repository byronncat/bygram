import { postImageDB } from '@db';
import { CloudinaryApiResponse } from '@db/db';
import { accountService } from '@services';
import { Condition, Post } from '@type';
import { getPublicId } from '@utils';

import mongoose from 'mongoose';
import { TypeId } from 'pg-promise/typescript/pg-subset';
const Post = mongoose.model(
  'post',
  new mongoose.Schema(
    {
      author: { type: Number, required: true },
      content: { type: String, required: true },
      imgURL: { type: String, required: true },
      createAt: { type: Date, default: Date.now },
    },
    {
      versionKey: false,
    }
  )
);

async function create(post: Post, file: Express.Multer.File) {
  const base64String = Buffer.from(file.buffer).toString('base64');
  const dataURL = `data:${file.mimetype};base64,${base64String}`;

  let secure_url = '';
  await postImageDB.uploader
    .upload(dataURL, { folder: `social-media-app/${post.author}` })
    .then((result: CloudinaryApiResponse) => {
      secure_url = result.secure_url!;
    })
    .catch((error: any) => {
      console.log(`[Cloudinary Error]: ${error}`);
      throw new Error(error);
    });

  Post.create({
    author: post.author,
    content: post.content,
    imgURL: secure_url,
  });
}

async function get(post: Post = {}, condition?: Condition) {
  if (condition?.one) {
    // TODO
  } else {
    const posts = await Post.find({ ...post, author: { $in: post.author } }).sort({ createAt: -1 });
    const returnPosts = await Promise.all(
      posts.map(async (post) => {
        const profile = await accountService.getProfile(post.author);
        return {
          id: post._id.toString(),
          uid: post.author,
          author: profile.name,
          avatar: profile.avatar,
          content: post.content,
          imgURL: post.imgURL,
          createAt: post.createAt,
        };
      })
    );
    return returnPosts;
  }
}

async function update(post: Post) {
  return await Post.findByIdAndUpdate(post._id, post);
}

async function remove(postId: string) {
  const deletedPost = await Post.findByIdAndDelete(postId);
  const publicId = getPublicId(deletedPost!.imgURL!);
  postImageDB.uploader
    .destroy(publicId)
    .then((result: any) => console.log(`[Cloudinary]: ${result.result}`))
    .catch((error: any) => console.log(`[Cloudinary Error]: ${error}`));
}

async function replaceImage(_id: any, imgURL: string) {
  return await Post.findByIdAndUpdate(_id, { imgURL });
}

async function getExplorePosts(id: number) {
  // ! Weird type error
  const followings = await accountService.getFollowings(id);
  const posts = await Post.aggregate([
    { $match: { author: { $nin: [...followings!, +id] } } },
    { $sample: { size: 100 } },
  ]);
  const returnPosts = await Promise.all(
    posts.map(async (post) => {
      post.name = await accountService.getName(post.author);
      console.log(post);
      return post;
    })
  );
  return returnPosts;
}

export default {
  create,
  get,
  update,
  remove,
  replaceImage,
  getExplorePosts,
};
