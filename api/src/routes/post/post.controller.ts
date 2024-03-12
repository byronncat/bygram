import { NextFunction, Request, Response } from 'express';
import { accountService, imageService, postService } from '@services';
import { API, Account, Post } from '@/type';
import mongoose, { ObjectId } from 'mongoose';

// setting options for multer
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function createPost(req: Request, res: Response) {
  try {
    if (!req.file) {
      res.status(409).json({
        success: false,
        message: 'No file uploaded',
      } as API);
    } else {
      const postInfo: Post = {
        author: req.body.author as number,
        content: req.body.content as string,
      };
      postService
        .create(postInfo, req.file)
        .then(() => {
          res.status(200).json({
            success: true,
            message: 'Post uploaded',
          } as API);
        })
        .catch((error: any) => {
          res.status(409).json({
            success: false,
            message: error.message,
          } as API);
        });
    }
  } catch (error) {
    console.log(`[Post Controller Error]: ${error}`);
    res.status(500).json({
      success: false,
      message: error,
    } as API);
  }
}

async function getPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const { id }: Account = req.query;
    if (!id) {
      res.status(409).json({
        success: false,
        message: 'No user id provided',
      } as API);
    } else {
      accountService.getFollowings(id).then(async (followings) => {
        const posts = await postService.get({ author: [id, ...followings!] }, { or: true });
        res.status(200).json({
          success: true,
          message: 'Posts retrieved',
          posts,
        } as API);
      });
    }
  } catch (error: any) {
    console.log(`[Post Controller Error]: ${error}`);
    res.status(404).json({
      success: false,
      message: error.message,
    } as API);
  }
}

async function deletePost(req: Request, res: Response, next: NextFunction) {
  try {
    const postId = req.params.id;
    await postService.remove(postId);
    res.status(200).json({
      success: true,
      message: 'Post deleted',
    } as API);
  } catch (error) {
    console.log(`[Post Controller Error]: ${error}`);
    res.status(500).json({
      success: false,
      message: error,
    } as API);
  }
}

async function updatePost(req: Request, res: Response, next: NextFunction) {
  try {
    const postInfo: Post = {
      _id: req.body._id as ObjectId,
      author: req.body.author as number,
      content: req.body.content as string,
    };
    if (!req.file) {
      await postService.update({ _id: postInfo._id, content: postInfo.content });
      res.status(200).json({
        success: true,
        message: 'Post updated',
      } as API);
    } else {
      const imgUrl = await imageService.replaceImage(
        req.file,
        req.body.oldImgURL as string,
        `social-media-app/${postInfo.author}`
      );
      const id = new mongoose.Types.ObjectId(req.body._id);
      await postService.replaceImage(id, imgUrl);
      res.status(200).json({
        success: true,
        message: 'Post updated',
      } as API);
    }
  } catch (error) {
    console.log(`[Post Controller Error]: ${error}`);
    res.status(500).json({
      success: false,
      message: error,
    } as API);
  }
}

async function explorePosts(req: Request, res: Response, next: NextFunction) {
  try {
    const { id }: Account = req.query;
    if (!id) {
      res.status(409).json({
        success: false,
        message: 'No user id provided',
      } as API);
    } else {
      const posts = await postService.getExplorePosts(id);
      res.status(200).json({
        success: true,
        message: 'Posts retrieved',
        posts,
      } as API);
    }
  } catch (error: any) {
    console.log(`[Post Controller Error]: ${error}`);
    res.status(404).json({
      success: false,
      message: error.message,
    } as API);
  }
}

export default {
  createPost: [upload.single('file'), createPost],
  getPosts: [getPosts],
  deletePost: [deletePost],
  updatePost: [upload.single('file'), updatePost],
  explorePosts: [explorePosts],
};
