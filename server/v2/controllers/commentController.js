import func from '../helpers/functions';
import allqueries from '../models/allqueries';
import pool from '../models/dbConnect';

class commentController {
    static async postComment (req, res) {
        const articleId = func.toInteger(req.params.id);

        const isThereArticle = await pool.query(allqueries.getOneArticle, [articleId]);

        if(isThereArticle.rows.lenght !== 0 && isThereArticle.rows[0].authorid === req.userData.id) {
            await pool.query(allqueries.insertComment, [
                    req.body.comment,
                    false,
                    req.userData.id,
                    articleId,
                    new Date(),
                ])
                .then((result) => {
                    return res.status(201).json({
                        status: 201,
                        message: "Comment created successfully",
                        data: result.rows,
                    });
                })
                .catch(err => {
                console.log('query error', err.message, err.stack);
                const message = "Query error";
                return res.status(422).json({
                    status: 422,
                    message,
                    error: err.message
                });
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: 'Article does not exist',
            });
        }
    }
};

export default commentController;