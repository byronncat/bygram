import { user } from '@middlewares';
import { userService } from '@services';
import { StatusCode } from '@constants';
import type { Request, Response } from 'express';
import type { API, GetProfileData, SearchProfileData } from '@types';
import { logger } from '@/utilities';

interface SearchProfileAPI extends API {
  data: SearchProfileData[] | null;
}

async function searchProfile(req: Request, res: Response) {
  const searchTerm = req.params.text;
  if (typeof searchTerm === 'undefined') {
    return res.status(StatusCode.BAD_REQUEST).json({
      success: false,
      message: 'Missing search term',
    } as SearchProfileAPI);
  }

  try {
    return res.status(StatusCode.OK).json({
      success: true,
      message: 'Search results',
      data: await userService.searchProfile(searchTerm),
    } as SearchProfileAPI);
  } catch (error) {
    logger.error(JSON.stringify(error), 'Search Profile Controller');
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: JSON.stringify(error),
    } as SearchProfileAPI);
  }
}

interface ProfileAPI extends API {
  data: GetProfileData | null;
}
async function getProfile(req: Request, res: Response) {
  const uid = parseInt(req.headers.uid as string, 10);
  try {
    return res.status(StatusCode.OK).json({
      success: true,
      message: 'Profile retrieved',
      data: await userService.getProfile(uid),
    } as ProfileAPI);
  } catch (error) {
    logger.error(JSON.stringify(error), 'Search Profile Controller');
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: JSON.stringify(error),
    } as SearchProfileAPI);
  }
}

export default {
  search: [user.authenticating, searchProfile],
  get: [user.authenticating, getProfile],
};
