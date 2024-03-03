import { NextFunction, Request, Response } from 'express';
import { postService } from '@services';
import { API, Post } from '@/type';

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
    const posts = await postService.get();
    res.status(200).json({
      success: true,
      message: 'Posts retrieved',
      posts,
    } as API);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error,
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

export default {
  createPost: [upload.single('file'), createPost],
  getPosts: [getPosts],
  deletePost: [deletePost],
};
