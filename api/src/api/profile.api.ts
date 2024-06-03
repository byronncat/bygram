import express from 'express';
import { profileController } from '@controllers';
const router = express.Router();

router.get('/search/:text', profileController.search);
router.get('/:username', profileController.get);
// router.put('/avatar', profileController.changeAvatar);
// router.put('/follow', profileController.follow);
// router.put('/unfollow', profileController.unfollow);

export default router;
