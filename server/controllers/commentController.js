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
                articleTitle: article.title,
                article: article.article,
                isInappropriate: false,
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
            error: 'Article does not exist',
        });
    },
    patchInappropriate: (req, res) => {
        const id = func.toInteger(req.params.id);
        const commentId = func.toInteger(req.params.commentId);
        const article = func.idFinder(articles, id);
        const comment = func.idFinder(article.comments, commentId);
        const inapproArticle = req.body.isInappropriate;
        if (article != null) {
            if (comment.id === commentId) {
                comment.isInappropriate = inapproArticle || comment.isInappropriate;

                return res.status(200).json({
                    status: 200,
                    message: 'Comment flagged as inappropriate',
                    data: comment,
                });
            }

            return res.status(404).json({
                status: 404,
                error: 'Comment does not exist',
            });
        }

        return res.status(404).json({
            status: 404,
            error: 'Article does not exist',
        });
    }
};

export default commentController;