import { Request, Response } from 'express';
import { accountService, postService } from '@services';
import { API, Account, Profile } from '@type';

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function getProfile(req: Request, res: Response) {
  const username = req.params.username as unknown as Account['username'];
  if (typeof username === 'undefined') {
    return res.status(400).json({
      success: false,
      message: 'Missing ID parameter',
    } as API);
  }

  let isFolowing = false;
  const requestUser = req.query.uid as unknown as Account['id'];
  const { id: target } = (await accountService.get({ username }, { one: true })) as Account;
  const profile = await accountService.getProfile(target!);
  if (profile) {
    const { username } = (await accountService.get({ id: target }, { one: true })) as Account;
    const posts = await postService.get({ author: target });
    const { avatar, uid, followers, followings, description } = profile._doc!;
    isFolowing = followers!.includes(requestUser);
    res.json({
      success: true,
      message: 'Profile retrieved',
      data: {
        uid,
        avatar,
        username,
        followers: followers!.length,
        followings: followings!.length,
        description,
        posts,
        isFolowing,
      },
    } as API);
  } else {
    res.status(402).json({
      success: false,
      message: 'Profile not found',
    } as API);
  }
}

async function changeAvatar(req: Request, res: Response) {
  try {
    if (!req.file) {
      res.status(409).json({
        success: false,
        message: 'No file uploaded',
      } as API);
    } else {
      const uid = req.body.uid as Profile['uid'];
      if (typeof uid === 'undefined') {
        return res.status(400).json({
          success: false,
          message: 'Missing UID parameter',
        } as API);
      }
      await accountService
        .setAvatar(uid, req.file)
        .then((avatar) => {
          res.status(200).json({
            success: true,
            message: 'Avatar changed',
            data: {
              avatar,
            },
          } as API);
        })
        .catch((error) => {
          res.status(500).json({
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
    .catch((error) => {
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
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: error.message,
      } as API);
    });
}

export default {
  getProfile: [getProfile],
  changeAvatar: [upload.single('file'), changeAvatar],
  follow: [follow],
  unfollow: [unfollow],
};
