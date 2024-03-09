import express from 'express';
import profileController from './profile.controller';
const router = express.Router();

router.get('/:username', profileController.getProfile);
router.post('/follow', profileController.follow);
router.put('/avatar', profileController.changeAvatar);
router.delete('/unfollow', profileController.unfollow);

export default router;
