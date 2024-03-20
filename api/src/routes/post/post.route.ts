import express from 'express';
import postController from './post.controller';
const router = express.Router();

router.get('/home', postController.home);
router.get('/explore', postController.explore);
router.post('/create', postController.createPost);
router.put('/update', postController.updatePost);
router.delete('/delete/:id', postController.deletePost);

export default router;
