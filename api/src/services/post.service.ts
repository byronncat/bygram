import { PostSchema } from "@/type";
import { socialMediaDB, postImageDB } from "@/db";

import mongoose from 'mongoose';
const Post = mongoose.model('post', new mongoose.Schema({
  content: String,
  imgURL: String,
}));

async function createPost(post: PostSchema, file: Express.Multer.File) {
  const base64String = Buffer.from(file.buffer).toString("base64");
  const dataURL = `data:${file.mimetype};base64,${base64String}`;

  let secure_url;
  await postImageDB.uploader
  .upload(dataURL, { folder: `social-media-app/${post.author}` })
  .then((result) => {
    secure_url = result.secure_url;
  })
  .catch((error) => { throw new Error(error) });
  
  Post.create({
    author: post.author,
    content: post.content,
    imgURL: secure_url,
  });

  return "File uploaded successfully";
}

async function getPosts() {
  const posts = await Post.find({});
  return posts;
}

module.exports = {
  createPost,
  getPosts,
};
