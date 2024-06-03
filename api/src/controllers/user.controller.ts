import { user } from '@middlewares';
import { userService } from '@services';
import { StatusCode } from '@constants';
import type { Request, Response } from 'express';
import type { API, SearchProfileData, UserToken } from '@types';

interface SearchProfileAPI extends API {
  data: SearchProfileData[];
}

async function searchProfile(req: Request, res: Response) {
  const searchTerm = req.params.text;
  if (typeof searchTerm === 'undefined') {
    return res.status(StatusCode.BAD_REQUEST).json({
      success: false,
      message: 'Missing search term',
    } as any);
  }

  return res.status(StatusCode.OK).json({
    success: true,
    message: 'Search results',
    data: await userService.searchProfile(searchTerm),
  } as SearchProfileAPI);
}

async function getProfile(req: Request, res: Response) {
  const uid = parseInt(req.headers.uid as string, 10);
  const user = req.user as UserToken;
  if (uid !== user.id) {
    return res.status(StatusCode.OK).json({
      success: true,
      message: 'Unauthorized',
      data: {
        uid,
        user: user.id,
      },
    } as any);
  }

  // return res.status(StatusCode.OK).json({
  //   success: true,
  //   message: 'Profile retrieved',
  //   data: req.user,
  // } as API);
  // try {
  //   return await accountService
  //     .getProfileByID(uid)
  //     .then(async (profile) => {
  //       if (profile) {
  //         const posts = await postService.getManyByID({ uid });
  //         res.status(200).json({
  //           success: true,
  //           message: 'Profile retrieved',
  //           data: {
  //             ...profile._doc,
  //             avatar: isEmptyObject(profile.avatar)
  //               ? undefined
  //               : profile.avatar,
  //             posts,
  //           },
  //         } as ProfileAPI);
  //       } else {
  //         return res.status(402).json({
  //           success: false,
  //           message: 'Profile not found',
  //         } as ProfileAPI);
  //       }
  //     })
  //     .catch((error) =>
  //       res.status(400).json({
  //         success: false,
  //         message: JSON.stringify(error),
  //       } as ProfileAPI),
  //     );
  // } catch (error: any) {
  //   return res.status(500).json({
  //     success: false,
  //     message: JSON.stringify(error),
  //   } as ProfileAPI);
  // }
}

export default {
  search: [user.parse, searchProfile],
  get: [user.parse, getProfile],
};
