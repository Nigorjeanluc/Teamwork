import express from 'express';

import commentController from '../controllers/commentController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/articles/:id/comments', authMiddleware, commentController.postComment);
router.patch('/articles/:id/comments/:commentId/inappropriate', authMiddleware, commentController.postComment);

export default router;