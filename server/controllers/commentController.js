import articles from '../models/articleModel';
import func from '../helpers/functions';

const commentController = {
    postComment: (req, res) => {
        const articleId = func.toInteger(req.params.id);
        const article = func.idFinder(articles, articleId);
        if (article) {
            const comment = {
                id: func.idIncrementor(article.comments),
                articleId: func.toInteger(req.params.id),
                createdOn: new Date().toLocaleString(),
                // eslint-disable-next-line max-len
                articleTitle: article.title,
                // eslint-disable-next-line max-len
                article: article.article,
                authorId: func.toInteger(req.userData.id),
                comments: req.body.comment,
            };

            article.comments.push(comment);
            return res.status(201).json({
                status: 201,
                message: 'Your comment was successfully created',
                data: comment,
            });
        }
        return res.status(404).json({
            status: 404,
            message: 'Article does not exist',
        });
    },
};

export default commentController;