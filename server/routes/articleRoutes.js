import express from 'express';

import articleController from '../controllers/articleController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/feeds', articleController.getAllArticles);
router.get('/myarticles', authMiddleware, articleController.getMyArticles);
router.post('/articles', authMiddleware, articleController.postArticle);
router.get('/articles/:id', authMiddleware, articleController.getArticle);
router.delete('/articles/:id', authMiddleware, articleController.deleteArticle);
router.patch('/articles/:id', authMiddleware, articleController.patchArticle);

export default router;