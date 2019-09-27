import articles from '../models/articleModel';

const commentController = {
    postComment: (req, res) => {
        const articleId = parseInt(req.params.id, 10);
        for (const article of articles) {
            if (article.id === articleId) {
                const comment = {
                    id: articleId,
                    articleId: parseInt(req.params.id, 10),
                    createdOn: new Date().toLocaleString(),
                    // eslint-disable-next-line max-len
                    articleTitle: article.title,
                    // eslint-disable-next-line max-len
                    article: article.article,
                    authorId: parseInt(req.body.authorId, 10),
                    comments: req.body.comment,
                };

                article.comments.push(comment);
                res.status(201).json({
                    status: 201,
                    message: 'Your comment was successfully created',
                    data: comment,
                });
            }
        }
    },
};

export default commentController;