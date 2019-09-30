import express from 'express';

import articleController from '../controllers/articleController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/api/v1/feeds', articleController.getAllArticles);
router.post('/api/v1/articles', authMiddleware, articleController.postArticle);
router.get('/api/v1/articles/:id', authMiddleware, articleController.getArticle);
router.delete('/api/v1/articles/:id', authMiddleware, articleController.deleteArticle);
router.patch('/api/v1/articles/:id', authMiddleware, articleController.patchArticle);

export default router;