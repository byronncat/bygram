import express from 'express';
import { userController } from '@controllers';
const router = express.Router();

router.get('/search/:text', userController.search);
router.get('/:username', userController.get);
// router.put('/avatar', profileController.changeAvatar);
// router.put('/follow', profileController.follow);
// router.put('/unfollow', profileController.unfollow);

export default router;
