import articles from '../models/articleModel';
import Article from '../models/articleClass';
import func from '../helpers/functions';

const articleController = {
    getAllArticles: (req, res) => {
        res.status(200).json({
            status: 200,
            message: 'Retrieved all articles',
            data: articles,
        });
    },
    getMyArticles: (req, res) => {
        const ownArticles = articles.filter((article) => article.authorId === req.userData.id);
        if (ownArticles.length > 0) {
            res.status(200).json({
                status: 200,
                message: 'Retrieved all articles',
                data: ownArticles,
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'You have no article yet',
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
            error: 'Article does not exist',
        });
    },
    getCategory: (req, res) => {
        const category = req.params.category;
        const categoryArticles = articles.filter((article) => article.category === category);
        if (categoryArticles.length > 0) {
            res.status(200).json({
                status: 200,
                message: `All articles from ${category} category`,
                data: categoryArticles,
            });
        }
        return res.status(404).json({
            status: 404,
            error: `${category} category articles does not exist`,
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
        const author = func.toInteger(req.userData.id);
        const article = func.idFinder(articles, id);
        const updatedArticle = req.body;

        if (article.id === id) {
            if (article.authorId === author) {
                article.title = updatedArticle.title || article.title;
                article.article = updatedArticle.article || article.article;

                return res.status(200).json({
                    status: 200,
                    message: 'Article edited successfully',
                    data: article,
                });
            }

            return res.status(403).json({
                status: 403,
                error: 'Article is not yours',
            });

        }

        return res.status(404).json({
            status: 404,
            error: 'Article does not exist',
        });
    },
    patchInappropriate: (req, res) => {
        const id = func.toInteger(req.params.id);
        const article = func.idFinder(articles, id);
        const inapproArticle = req.body.isInappropriate;
        if (article != null) {
            if (article.id === id) {
                article.isInappropriate = inapproArticle || article.isInappropriate;

                return res.status(200).json({
                    status: 200,
                    message: 'Article flagged as inappropriate',
                    data: article,
                });
            }

            return res.status(404).json({
                status: 404,
                error: 'Article does not exist',
            });
        }

        return res.status(404).json({
            status: 404,
            error: 'Article does not exist',
        });
    },
    deleteArticle: (req, res) => {
        const id = func.toInteger(req.params.id);
        const article = func.idFinder(articles, id);
        const author = func.toInteger(req.userData.id);
        if (article) {
            if (article.authorId === author) {
                articles.splice(articles.indexOf(article), 1);
                return res.sendStatus(204)
            }

            return res.status(403).json({
                status: 403,
                error: 'Article is not yours',
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'Article does not exist',
        });
    },
};

export default articleController;