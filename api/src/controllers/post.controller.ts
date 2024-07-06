import { postService } from '@services';
import { logger } from '@utilities';
import { StatusCode } from '@constants';
// import { createPost } from '@/database/access';

import type { Request, Response } from 'express';
import type { API, PostUploadData, UserToken } from '@types';

async function getHomePosts(req: Request, res: Response) {
  const uid = res.locals.user.id as UserToken['id'];
  try {
    return res.json({
      success: true,
      message: 'Posts retrieved',
      data: await postService.getHomePosts(uid),
    });
    //     const followings = await accountService.getFollowingsByID(uid);
    //     return await postService
    //       .getManyByID({ uid: [uid, ...followings!] })
    //       .then((posts) =>
    //         res.status(200).json({
    //           success: true,
    //           message: 'Posts retrieved',
    //           data: posts,
    //         } as PostAPI),
    //       )
    //       .catch((error) =>
    //         res.status(404).json({
    //           success: false,
    //           message: JSON.stringify(error),
    //         } as PostAPI),
    //       );
    //   } catch (error: any) {
    //     logger.error(`${error}`, 'Post controller');
    //     res.status(404).json({
    //       success: false,
    //       message: error.message,
    //     } as PostAPI);
    //   }
  } catch (error) {
    logger.error(JSON.stringify(error), 'Post Controller');
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error, get home posts failed',
    });
  }
}

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
    logger.error(JSON.stringify(error), 'Post Controller');
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error, post upload failed',
    });
  }
}

export default {
  home: [getHomePosts],
  //   explore: [explorePosts],
  create: [createPost],
  //   updatePost: [upload.single('file'), updatePost],
  //   deletePost: [deletePost],
  //   likePost: [likePost],
  //   commentPost: [commentPost],
  //   getComments: [getComments],
  //   deleteComment: [deleteComment],
};
