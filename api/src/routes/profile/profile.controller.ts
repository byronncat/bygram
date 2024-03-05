import { Request, Response } from 'express';
import { accountService, postService } from '@services';
import { API, Account } from '@type';

async function getProfile(req: Request, res: Response) {
  const id = req.params.id as unknown as Account['id'];
  if (typeof id === 'undefined') {
    return res.status(400).json({
      success: false,
      message: 'Missing ID parameter',
    } as API);
  }

  const profile = await accountService.getProfile(id);
  if (profile) {
    const { username } = (await accountService.get({ id }, { one: true })) as Account;
    const posts = await postService.get({ author: id });
    const { avatar, uid } = profile._doc!;
    res.json({
      success: true,
      message: 'Profile retrieved',
      data: {
        avatar,
        uid,
        username,
        posts,
      },
    } as API);
  } else {
    res.status(402).json({
      success: false,
      message: 'Profile not found',
    } as API);
  }
}

export default {
  getProfile: [getProfile],
};
