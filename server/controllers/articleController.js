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
            return res.status(200).json({
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
            return res.status(204).json({
                status: 204,
                message: 'article successfully deleted',
            });
        }
        res.sendStatus(404);
    },
    postArticle: (req, res) => {
        const article = {
            id: parseInt(articles.length - 1, 10),
            createdOn: Date(new Date()),
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
        const updatedArticle = req.body;

        for (const article of articles) {
            if (article.id === id) {
                article.title = updatedArticle.title || article.title;
                article.article = updatedArticle.article || article.article;

                return res.status(200).json({
                    status: 200,
                    message: 'Article edited successfully',
                    data: article,
                });
            }
        }

        res.status(404).json({
            status: 404,
            message: 'No found with the given id',
        });
    },
};

export default articleController;