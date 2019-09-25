import articles from '../models/articleModel';

const articleController = {
    getAllArticles: (req, res) => {
        res.status(200).json({
            status: 200,
            message: 'Retrieved all articles',
            data: articles,
        });
    },
    getArticle: (req, res) => {
        const matchArticle = articles.find((article) => article.id === parseInt(req.params.id, 10));
        if (matchArticle) {
            res.status(200).json({
                status: 200,
                message: 'Fetched article successfully',
                data: matchArticle,
            });
        }
        res.sendStatus(404);
    },
    deleteArticle: (req, res) => {
        const id = parseInt(req.params.id, 10);
        // eslint-disable-next-line no-shadow
        const article = articles.find((article) => article.id === id);

        if (article) {
            articles.splice(articles.indexOf(article), 1);
            res.status(204).json({
                status: 204,
                message: 'article successfully deleted',
            });
        }
        res.sendStatus(404);
    },
    postArticle: (req, res) => {
        const article = {
            id: parseInt(req.body.id, 10),
            createdOn: 'in the future',
            title: req.body.title,
            article: req.body.article,
            authorId: parseInt(req.body.authorId, 10),
            comments: req.body.comments,
        };

        articles.push(article);
        res.status(201).json({
            status: 201,
            message: 'article created successfully',
            data: article,
        });
    },
    patchArticle: (req, res) => {
        const id = parseInt(req.params.id, 10);
        // eslint-disable-next-line max-len
        const matchArticle = articles.find((articleOne) => articleOne.id === id);

        const article = {
            title: req.body.title,
            article: req.body.article,
        };

        if (matchArticle) {
            if (article.title && article.article) {
                articles[id - 1].title = article.title;
                articles[id - 1].article = article.article;
                res.status(200).json({
                    status: 200,
                    message: 'Change Title and Content',
                    data: matchArticle,
                });
            } else if (article.title) {
                articles[id - 1].title = article.title;
                res.status(200).json({
                    status: 200,
                    message: 'Change Title',
                    data: matchArticle,
                });
            } else if (article.article) {
                articles[id - 1].article = article.article;
                res.status(200).json({
                    status: 200,
                    message: 'Change Content',
                    data: matchArticle,
                });
            }
        }

        res.sendStatus(404);
    },
};

export default articleController;