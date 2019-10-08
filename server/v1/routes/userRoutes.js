import express from 'express';
import userController from '../controllers/userController';
import authValidator from './../middlewares/authValidator';

const router = express.Router();

router.post('/auth/signup', authValidator.signupValidator, userController.signUp);
router.post('/auth/signin', authValidator.signinValidator, userController.signIn);
export default router;