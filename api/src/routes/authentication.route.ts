import express from 'express';
import { authenticationController } from '@/controllers';
const router = express.Router();

router.get('/authenticate', authenticationController.authenticate);
router.post('/login', authenticationController.logIn);
router.post('/register', authenticationController.register);
router.delete('/logout', authenticationController.logOut);

export default router;
