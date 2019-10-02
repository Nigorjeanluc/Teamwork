import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/api/v1/auth/signup', userController.signUp);
router.post('/api/v1/auth/signin', userController.signIn);
export default router;