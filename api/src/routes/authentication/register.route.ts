import express from 'express';
import controller from './controllers/index';
const router = express.Router();

router.post('/', controller.register);

export default router;
