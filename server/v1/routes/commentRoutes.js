import express from 'express';

import commentController from '../controllers/commentController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/articles/:id/comments', authMiddleware, commentController.postComment);

export default router;