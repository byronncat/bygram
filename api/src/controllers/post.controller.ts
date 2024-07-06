import { postService } from '@services';
import { logger } from '@utilities';
import { StatusCode } from '@constants';
// import { createPost } from '@/database/access';

import type { Request, Response } from 'express';
import type { API, PostUploadData } from '@types';

async function createPost(req: Request, res: Response) {
  try {
    const postData = req.body as PostUploadData;
    const uid = res.locals.user.id;
    return await postService
      .create(uid, postData)
      .then(() => {
        return res.status(StatusCode.OK).json({
          success: true,
          message: 'Post uploaded',
        } as API);
      })
      .catch((error) =>
        res.status(StatusCode.UNPROCESSABLE_ENTITY).json({
          success: false,
          message: JSON.stringify(error),
        } as API),
      );
  } catch (error) {
    logger.error(JSON.stringify(error), 'Login Controller');
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error, login failed',
    });
  }
}

export default {
  //   home: [getHomePosts],
  //   explore: [explorePosts],
  create: [createPost],
  //   updatePost: [upload.single('file'), updatePost],
  //   deletePost: [deletePost],
  //   likePost: [likePost],
  //   commentPost: [commentPost],
  //   getComments: [getComments],
  //   deleteComment: [deleteComment],
};
