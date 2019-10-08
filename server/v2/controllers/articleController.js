import pool from '../models/dbConnect';
import allqueries from '../models/allqueries';
import Article from '../models/articleClass';
import func from '../helpers/functions';

const articleController = {
    getAllArticles: async (req, res) => {
        const articles = await pool.query(allqueries.getAllArticles);
        res.status(200).json({
            status: 200,
            message: 'Retrieved all articles',
            data: articles.rows,
        });
    },
    getMyArticles: (req, res) => {
        const ownArticles = articles.filter((article) => article === req.userData.id);
        if (ownArticles) {
            res.status(200).json({
                status: 200,
                message: 'Retrieved all articles',
                data: articles,
            });
        }
        return res.status(404).json({
            status: 404,
            message: 'You have no article yet',
        });
    },
    getArticle: (req, res) => {
        const id = func.toInteger(req.params.id);
        const article = func.idFinder(articles, id);
        if (article) {
            return res.status(200).json({
                status: 200,
                message: 'Fetched article successfully',
                data: article,
            });
        }
        return res.status(404).json({
            status: 404,
            message: 'Article does not exist',
        });
    },
    deleteArticle: (req, res) => {
        const id = func.toInteger(req.params.id);
        const article = func.idFinder(articles, id);

        if (article) {
            articles.splice(articles.indexOf(article), 1);
            return res.status(204).json({
                status: 204,
                message: 'article successfully deleted',
            });
        }
        return res.status(404).json({
            status: 404,
            message: 'Article does not exist',
        });
    },
    postArticle: (req, res) => {
        const id = func.toInteger(req.userData.id);
        const article = new Article(req.body.title, req.body.article, req.body.category, id);

        articles.push(article);
        res.status(201).json({
            status: 201,
            message: 'article created successfully',
            data: article,
        });
    },
    patchArticle: (req, res) => {
        const id = func.toInteger(req.params.id);
        const article = func.idFinder(articles, id);
        const updatedArticle = req.body;

        if (article.id === id) {
            article.title = updatedArticle.title || article.title;
            article.article = updatedArticle.article || article.article;

            return res.status(200).json({
                status: 200,
                message: 'Article edited successfully',
                data: article,
            });
        }

        return res.status(404).json({
            status: 404,
            message: 'Article does not exist',
        });
    },
};

export default articleController;