import { NextFunction, Request, Response } from 'express';
import { accountService, postService } from '@services';
import { API, Profile, PostData, PostAPI, CommentAPI } from '@types';

// setting options for multer
import multer from 'multer';
import { logger } from '@utilities';
import { PostDocument } from '@database';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function getHomePosts(req: Request, res: Response, next: NextFunction) {
  const { uid }: Profile = req.query;
  if (!uid)
    return res.status(409).json({
      success: false,
      message: 'No user id provided',
    } as PostAPI);
  try {
    const followings = await accountService.getFollowingsByID(uid);
    return await postService
      .getManyByID({ uid: [uid, ...followings!] })
      .then((posts) =>
        res.status(200).json({
          success: true,
          message: 'Posts retrieved',
          data: posts,
        } as PostAPI),
      )
      .catch((error) =>
        res.status(404).json({
          success: false,
          message: JSON.stringify(error),
        } as PostAPI),
      );
  } catch (error: any) {
    logger.error(`${error}`, 'Post controller');
    res.status(404).json({
      success: false,
      message: error.message,
    } as PostAPI);
  }
}

async function explorePosts(req: Request, res: Response, next: NextFunction) {
  try {
    const { uid } = req.query as Profile;
    if (!uid) {
      return res.status(409).json({
        success: false,
        message: 'No user id provided',
      } as PostAPI);
    }

    return await postService
      .exploreByID(uid)
      .then((posts) =>
        res.status(200).json({
          success: true,
          message: 'Posts retrieved',
          data: posts,
        } as PostAPI),
      )
      .catch((error) =>
        res.status(404).json({
          success: false,
          message: JSON.stringify(error),
        } as PostAPI),
      );
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    } as PostAPI);
  }
}

async function createPost(req: Request, res: Response) {
  if (!req.file)
    return res.status(409).json({
      success: false,
      message: 'No file uploaded',
    } as API);
  try {
    const postInfo = {
      uid: req.body.uid,
      content: req.body.content,
    } as PostData;
    return postService
      .create(postInfo, req.file)
      .then((post: PostDocument) => {
        return res.status(200).json({
          success: true,
          message: 'Post uploaded',
        } as API);
      })
      .catch((error) =>
        res.status(409).json({
          success: false,
          message: JSON.stringify(error),
        } as API),
      );
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: JSON.stringify(error),
    } as API);
  }
}

async function deletePost(req: Request, res: Response, next: NextFunction) {
  const postId: PostData['id'] = req.params.id;
  try {
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
      message: JSON.stringify(error),
    } as API);
  }
}

async function updatePost(req: Request, res: Response, next: NextFunction) {
  try {
    const postInfo: PostData = {
      id: req.body.id as string,
      content: req.body.content as string,
    };
    return await postService
      .updateByID(postInfo.id, { content: postInfo.content }, req.file)
      .then((result) => {
        if (result)
          return res.status(200).json({
            success: true,
            message: 'Post updated',
          } as API);
        return res.status(409).json({
          success: false,
          message: 'Post not updated',
        } as API);
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: JSON.stringify(error),
    } as API);
  }
}

async function likePost(req: Request, res: Response, next: NextFunction) {
  const { uid, postID } = req.body;
  try {
    return await postService
      .likeByID(uid, postID)
      .then((result) => {
        if (result)
          return res.status(200).json({
            success: true,
            message: 'Post liked',
          } as API);
        return res.status(409).json({
          success: false,
          message: 'Post not liked',
        } as API);
      })
      .catch((error) =>
        res.status(409).json({
          success: false,
          message: JSON.stringify(error),
        } as API),
      );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: JSON.stringify(error),
    } as API);
  }
}

async function commentPost(req: Request, res: Response, next: NextFunction) {
  const { uid, postID, content } = req.body;
  try {
    return await postService
      .addCommentByID(uid, postID, content)
      .then((result) => {
        if (result)
          return res.status(200).json({
            success: true,
            message: 'Post commented',
          } as API);
        return res.status(409).json({
          success: false,
          message: 'Post not commented',
        } as API);
      })
      .catch((error) =>
        res.status(409).json({
          success: false,
          message: JSON.stringify(error),
        } as API),
      );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: JSON.stringify(error),
    } as API);
  }
}

async function getComments(req: Request, res: Response, next: NextFunction) {
  const postID: PostData['id'] = req.params.id;
  try {
    return await postService
      .getCommentsByID(postID)
      .then((comments) =>
        res.status(200).json({
          success: true,
          message: 'Comments retrieved',
          data: comments,
        } as CommentAPI),
      )
      .catch((error) =>
        res.status(409).json({
          success: false,
          message: JSON.stringify(error),
        } as CommentAPI),
      );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: JSON.stringify(error),
    } as CommentAPI);
  }
}

async function deleteComment(req: Request, res: Response, next: NextFunction) {
  const { postID, commentID } = req.body;
  console.log(postID, commentID);
  if (!postID || !commentID)
    return res.status(409).json({
      success: false,
      message: 'No post or comment id provided',
    } as API);
  try {
    return await postService
      .removeCommentByID(postID, commentID)
      .then((result) => {
        if (result)
          return res.status(200).json({
            success: true,
            message: 'Comment deleted',
          } as API);
        return res.status(409).json({
          success: false,
          message: 'Comment not deleted',
        } as API);
      })
      .catch((error: any) =>
        res.status(409).json({
          success: false,
          message: JSON.stringify(error),
        } as API),
      );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: JSON.stringify(error),
    } as API);
  }
}

export default {
  home: [getHomePosts],
  explore: [explorePosts],
  createPost: [upload.single('file'), createPost],
  updatePost: [upload.single('file'), updatePost],
  deletePost: [deletePost],
  likePost: [likePost],
  commentPost: [commentPost],
  getComments: [getComments],
  deleteComment: [deleteComment],
};
