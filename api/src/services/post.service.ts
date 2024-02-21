import { PostSchema } from "@/type";
import { postImageDB } from "@/db";
const accountService = require("@services/account.service");

import mongoose from "mongoose";
import { url } from "inspector";
const Post = mongoose.model(
  "post",
  new mongoose.Schema(
    {
      author: Number,
      content: String,
      imgURL: String,
      createAt: { default: Date.now, type: Date },
    },
    {
      versionKey: false,
    }
  )
);

async function createPost(post: PostSchema, file: Express.Multer.File) {
  const base64String = Buffer.from(file.buffer).toString("base64");
  const dataURL = `data:${file.mimetype};base64,${base64String}`;

  let secure_url;
  await postImageDB.uploader
    .upload(dataURL, { folder: `social-media-app/${post.author}` })
    .then((result) => {
      secure_url = result.secure_url;
    })
    .catch((error) => {
      throw new Error(error);
    });

  Post.create({
    author: post.author,
    content: post.content,
    imgURL: secure_url,
  });

  return "File uploaded successfully";
}

async function getAllPosts() {
  const posts = await Post.find({}).sort({ createAt: -1 });
  const returnPosts = await Promise.all(
    posts.map(async (post) => {
      const { username } = await accountService.getUsernameById(post.author);
      const profile = await accountService.getProfile(post.author);
      return {
        id: post._id.toString(),
        avatar: profile.avatar,
        author: username,
        content: post.content,
        imgURL: post.imgURL,
        createAt: post.createAt,
      };
    })
  );
  return returnPosts;
}

async function getPostsByAuthorId(authorId: number) {
  const posts = await Post.find({ author: authorId }).sort({ createAt: -1 });
  const returnPosts = await Promise.all(
    posts.map(async (post) => {
      const { username } = await accountService.getUsernameById(post.author);
      return {
        id: Object.values(post._id).join(""),
        author: username,
        content: post.content,
        imgURL: post.imgURL,
        createAt: post.createAt,
      };
    })
  );
  return returnPosts;
}

function getPublicId(imageUrl: string) {
  const urlParts = imageUrl.split('/');
  const publicId = `social-media-app/${urlParts[urlParts.length - 2]}/${urlParts[urlParts.length - 1].split('.')[0]}`;
  return publicId;
}

async function deletePost(postId: string) {
  const deletedPost = await Post.findByIdAndDelete(postId);
  const publicId = getPublicId(deletedPost!.imgURL!);
  postImageDB.uploader.destroy(publicId)
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
  return "Post deleted";
}

module.exports = {
  createPost,
  getAllPosts,
  getPostsByAuthorId,
  deletePost,
};
