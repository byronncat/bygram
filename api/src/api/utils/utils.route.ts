import express from 'express';
import controller from './utils.controller';
const router = express.Router();

router.post('/', controller.sendEmail);

export default router;
