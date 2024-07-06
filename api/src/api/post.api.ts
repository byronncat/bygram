import express from 'express';
import { postController } from '@controllers';
const router = express.Router();

// router.get('/home', postController.home);
// router.get('/explore', postController.explore);
// router.get('/comment/:id', postController.getComments);
// router.post('/like', postController.likePost);
// router.post('/comment', postController.commentPost);
router.post('/', postController.create);
// router.put('/', postController.updatePost);
// router.delete('/comment', postController.deleteComment);
// router.delete('/:id', postController.deletePost);

export default router;
