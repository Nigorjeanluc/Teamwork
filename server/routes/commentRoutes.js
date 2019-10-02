import express from 'express';

import commentController from '../controllers/commentController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/api/v1/articles/:id/comments', authMiddleware, commentController.postComment);

export default router;