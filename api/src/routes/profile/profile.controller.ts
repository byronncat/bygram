import { Request, Response } from 'express';
import { accountService, postService } from '@services';
import { API, AvatarAPI, Profile, ProfileAPI, SearchProfileAPI } from '@types';

import multer from 'multer';
import { isEmptyObject } from '@utils';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function searchTerm(req: Request, res: Response) {
  const searchTerm = req.params.searchTerm;
  if (typeof searchTerm === 'undefined') {
    return res.status(400).json({
      success: false,
      message: 'Missing search term',
    } as SearchProfileAPI);
  }

  const results = await accountService.searchProfile(searchTerm);
  return res.json({
    success: true,
    message: 'Search results',
    data: results,
  } as SearchProfileAPI);
}

async function changeAvatar(req: Request, res: Response, next: any) {
  const uid = req.body.uid as Profile['uid'];
  if (typeof uid === 'undefined') {
    return res.status(400).json({
      success: false,
      message: 'Missing UID parameter',
    } as AvatarAPI);
  }

  const type = req.query.type as string;
  if (type === 'remove') {
    return await accountService
      .removeAvatar(uid)
      .then(() =>
        res.status(200).json({
          success: true,
          message: 'Avatar removed',
        } as AvatarAPI)
      )
      .catch((error) =>
        res.status(500).json({
          success: false,
          message: JSON.stringify(error),
        } as AvatarAPI)
      );
  }

  if (!('file' in req)) {
    return res.status(409).json({
      success: false,
      message: 'No file uploaded',
    } as AvatarAPI);
  }

  try {
    return await accountService
      .setAvatar(uid, req.file!)
      .then((avatar) => {
        if (avatar) {
          return res.status(200).json({
            success: true,
            message: 'Avatar changed',
            data: avatar,
          } as AvatarAPI);
        } else {
          return res.status(500).json({
            success: false,
            message: 'Avatar not changed',
          } as AvatarAPI);
        }
      })
      .catch((error) =>
        res.status(500).json({
          success: false,
          message: JSON.stringify(error),
        } as AvatarAPI)
      );
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: JSON.stringify(error),
    } as AvatarAPI);
  }
}

async function getProfile(req: Request, res: Response) {
  const uid = req.params.uid as unknown as Profile['uid'];
  if (typeof uid === 'undefined') {
    return res.status(400).json({
      success: false,
      message: 'Missing UID parameter',
    } as ProfileAPI);
  }

  try {
    return await accountService
      .getProfileByID(uid)
      .then(async (profile) => {
        if (profile) {
          const posts = await postService.getManyByID({ uid });
          res.status(200).json({
            success: true,
            message: 'Profile retrieved',
            data: {
              ...profile._doc,
              avatar: isEmptyObject(profile.avatar) ? undefined : profile.avatar,
              posts,
            },
          } as ProfileAPI);
        } else {
          return res.status(402).json({
            success: false,
            message: 'Profile not found',
          } as ProfileAPI);
        }
      })
      .catch((error) =>
        res.status(400).json({ success: false, message: JSON.stringify(error) } as ProfileAPI)
      );
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: JSON.stringify(error),
    } as ProfileAPI);
  }
}

async function follow(req: Request, res: Response) {
  const { uid, target } = req.body;
  if (typeof uid === 'undefined' || typeof target === 'undefined') {
    return res.status(400).json({
      success: false,
      message: 'Missing UID or target parameter',
    } as API);
  }

  await accountService
    .follow(uid, target)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Followed',
      } as API);
    })
    .catch((error: any) => {
      res.status(500).json({
        success: false,
        message: error.message,
      } as API);
    });
}

async function unfollow(req: Request, res: Response) {
  const { uid, target } = req.body;
  if (typeof uid === 'undefined' || typeof target === 'undefined') {
    return res.status(400).json({
      success: false,
      message: 'Missing UID or target parameter',
    } as API);
  }

  await accountService
    .unfollow(uid, target)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Unfollowed',
      } as API);
    })
    .catch((error: any) => {
      res.status(500).json({
        success: false,
        message: error.message,
      } as API);
    });
}

export default {
  search: [searchTerm],
  changeAvatar: [upload.single('file'), changeAvatar],
  getProfile: [getProfile],
  follow: [follow],
  unfollow: [unfollow],
};
