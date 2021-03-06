import express from 'express';

import articleController from '../controllers/articleController';
import authMiddleware from '../middlewares/authMiddleware';
import articleValidator from '../middlewares/articleValidator';

const router = express.Router();

router.get('/feeds', articleController.getAllArticles);
router.get('/myarticles', authMiddleware, articleController.getMyArticles);
router.post('/articles', authMiddleware, articleValidator.postValidator, articleController.postArticle);
router.get('/articles/:id', authMiddleware, articleController.getArticle);
router.delete('/articles/:id', authMiddleware, articleController.deleteArticle);
router.patch('/articles/:id', authMiddleware, articleValidator.patchValidator, articleController.patchArticle);

export default router;