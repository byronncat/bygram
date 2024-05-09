import express from 'express';
import { authenticationController } from '@/controllers';
const router = express.Router();

router.post('/login', authenticationController.logIn);

export default router;
