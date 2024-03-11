import express from 'express';
import postController from './post.controller';
const router = express.Router();

router.post('/create', postController.createPost);
router.get('/all', postController.getPosts);
router.put('/update', postController.updatePost);
router.delete('/delete/:id', postController.deletePost);

export default router;
