import { NextFunction, Request, Response } from 'express';
import { accountService, fileService, postService } from '@services';
import { API, Account, Post, Profile } from '@types';
import mongoose, { ObjectId } from 'mongoose';

// setting options for multer
import multer from 'multer';
import { logger } from '@utils';
import { HomeAPI } from './types';
import { PostData } from '@services/types';
import { PostDocument } from '@db/schema.mongodb';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function getHomePosts(req: Request, res: Response, next: NextFunction) {
  try {
    const { uid }: Profile = req.query;
    if (!uid) {
      res.status(409).json({
        success: false,
        message: 'No user id provided',
      } as API);
    } else {
      const followings = await accountService.getFollowings(uid);
      const posts = await postService.getManyByID({ uid: [uid, ...followings!] });
      res.status(200).json({
        success: true,
        message: 'Posts retrieved',
        data: posts,
      } as HomeAPI);
    }
  } catch (error: any) {
    logger.error(`${error}`, 'Post controller');
    res.status(404).json({
      success: false,
      message: error.message,
    } as API);
  }
}

async function createPost(req: Request, res: Response) {
  try {
    if (!req.file) {
      res.status(409).json({
        success: false,
        message: 'No file uploaded',
      } as API);
    } else {
      const postInfo = {
        uid: req.body.uid,
        content: req.body.content,
      } as PostData;

      postService
        .create(postInfo, req.file)
        .then((post: PostDocument | null) => {
          if (!post) {
            res.status(409).json({
              success: false,
              message: 'Post not uploaded',
            } as API);
          }
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
    logger.error(`${error}`, 'Post controller');
    res.status(500).json({
      success: false,
      message: error,
    } as API);
  }
}

async function deletePost(req: Request, res: Response, next: NextFunction) {
  try {
    const postId: PostData['id'] = req.params.id;
    const post = await postService.removeByID(postId);
    if (post) {
      res.status(200).json({
        success: true,
        message: 'Post deleted',
      } as API);
    } else {
      res.status(409).json({
        success: false,
        message: 'Post not deleted',
      } as API);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    } as API);
  }
}

// ! Need to maintain

async function updatePost(req: Request, res: Response, next: NextFunction) {
  try {
    const postInfo: any = {
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
      const imgUrl = await fileService.replaceImage(
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
  home: [getHomePosts],
  createPost: [upload.single('file'), createPost],
  deletePost: [deletePost],
  //
  updatePost: [upload.single('file'), updatePost],
  explorePosts: [explorePosts],
};
