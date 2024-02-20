import { Request, Response } from 'express';
const accountService = require('@services/account.service');
const postService = require('@services/post.service');

module.exports = {
  getProfile: async (req: Request, res: Response) => {
    const { id } = req.params;
    const profile = await accountService.getProfile(id);
    if (profile) {
      const { username } = await accountService.getUsernameById(id);
      const posts = await postService.getPostsByAuthorId(id);
      res.json({
        success: true,
        message: "Profile retrieved",
        ...profile._doc,
        username,
        posts,
      });
    } else {
      res.status(402).json({
        success: false,
        message: "Profile not found",
      });
    }
  }
}