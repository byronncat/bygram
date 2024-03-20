import express from 'express';
import profileController from './profile.controller';
const router = express.Router();

router.get('/search/:searchTerm', profileController.search);
router.get('/:uid', profileController.getProfile);
router.put('/avatar', profileController.changeAvatar);
router.put('/follow', profileController.follow);
router.put('/unfollow', profileController.unfollow);

export default router;
