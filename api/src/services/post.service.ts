import { postImageDB } from '@db';
import { CloudinaryApiResponse } from '@db/db';
import { accountService } from '@services';
import { Account, Condition, Post } from '@type';
import { getPublicId } from '@utils';

import mongoose from 'mongoose';
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
    const posts = await Post.find(post).sort({ createAt: -1 });
    const returnPosts = await Promise.all(
      posts.map(async (post) => {
        const { username } = (await accountService.get(
          { id: post.author },
          { one: true }
        )) as Account;
        const profile = await accountService.getProfile(post.author);
        return {
          id: post._id.toString(),
          author: username,
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

async function remove(postId: string) {
  const deletedPost = await Post.findByIdAndDelete(postId);
  const publicId = getPublicId(deletedPost!.imgURL!);
  postImageDB.uploader
    .destroy(publicId)
    .then((result: any) => console.log(`[Cloudinary]: ${result.result}`))
    .catch((error: any) => console.log(`[Cloudinary Error]: ${error}`));
}

export default {
  create,
  get,
  remove,
};
