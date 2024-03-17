import express from 'express';
import profileController from './profile.controller';
const router = express.Router();

router.get('/search/:searchTerm', profileController.search);
router.get('/:username/:id', profileController.getProfile);
router.post('/follow', profileController.follow);
router.put('/avatar', profileController.changeAvatar);
router.delete('/unfollow', profileController.unfollow);

export default router;
