import express from 'express';

import articleController from '../controllers/articleController';

const router = express.Router();

router.get('/api/v1/articles', articleController.getAllArticles);
router.post('/api/v1/articles', articleController.postArticle);
router.get('/api/v1/articles/:id', articleController.getArticle);
router.delete('/api/v1/articles/:id', articleController.deleteArticle);
router.patch('/api/v1/articles/:id', articleController.patchArticle);

export default router;