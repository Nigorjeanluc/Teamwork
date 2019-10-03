import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/auth/signup', userController.signUp);
router.post('/auth/signin', userController.signIn);
export default router;