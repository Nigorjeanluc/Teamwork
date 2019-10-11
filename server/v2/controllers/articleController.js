import pool from "../models/dbConnect";
import allqueries from "../models/allqueries";
import Article from "../models/articleClass";
import func from "../helpers/functions";

class ArticleController {
  static async getAllArticles(req, res) {
    await pool
      .query(allqueries.getAllArticles)
      .then(result => {
        if (result.rows.length !== 0) {
          res.status(200).json({
            status: 200,
            message: "Retrieved all articles",
            data: { ...Object.values(result.rows) }
          });
        } else {
          res.status(404).json({
            status: 404,
            error: "No articles found"
          });
        }
      })
      .catch(err => {
        console.log("query error", err.message, err.stack);
        const message = "Query error";
        return res.status(422).json({
          status: 422,
          message,
          error: err.message
        });
      });
  }
  static async getMyArticles(req, res) {
    await pool
      .query(allqueries.getMyArticles, [req.userData.id])
      .then(result => {
        if (result.rows.length !== 0) {
          return res.status(200).json({
            status: 200,
            message: "Fetched article successfully",
            data: { ...Object.values(result.rows) }
          });
        } else {
          res.status(404).json({
            status: 404,
            error: "No articles posted yet"
          });
        }
      })
      .catch(err => {
        console.log("query error", err.message, err.stack);
        const message = "Query error";
        return res.status(422).json({
          status: 422,
          message,
          error: err.message
        });
      });
  }
  static async getArticle(req, res) {
    const id = func.toInteger(req.params.id);
    await pool
      .query(allqueries.getOneArticle, [id])
      .then(result => {
        if (result.rows.length !== 0) {
          return res.status(200).json({
            status: 200,
            message: "Fetched article successfully",
            data: result.rows[0]
          });
        } else {
          res.status(404).json({
            status: 404,
            error: "Article does not exist"
          });
        }
      })
      .catch(err => {
        console.log("query error", err.message, err.stack);
        const message = "Query error";
        return res.status(422).json({
          status: 422,
          message,
          error: err.message
        });
      });
  }
  static async deleteArticle(req, res) {
    const id = func.toInteger(req.params.id);
    const authorId = func.toInteger(req.userData.id);

    const isStored = await pool.query(allqueries.getOneArticle, [id]);

    if (isStored.rows.length !== 0) {
      if (authorId === isStored.rows[0].authorid) {
        await pool
          .query(allqueries.deleteArticle, [id])
          .then(result => {
            return res.sendStatus(204);
          })
          .catch(err => {
            console.log("query error", err.message, err.stack);
            const message = "Query error";
            return res.status(422).json({
              status: 422,
              message,
              error: err.message
            });
          });
      } else {
        return res.status(405).json({
          status: 405,
          error: "You are not allowed to delete this article"
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        error: "Article does not exist"
      });
    }
  }
  static async postArticle(req, res) {
    const id = func.toInteger(req.userData.id);
    const article = new Article(
      req.body.title,
      req.body.article,
      req.body.category,
      id
    );

    await pool
      .query(allqueries.insertArticle, [
        article.title,
        article.article,
        article.category,
        article.isInappropiate,
        article.authorId,
        article.createdOn,
        article.updatedOn
      ])
      .then(result => {
        if (result.rows.length !== 0) {
          return res.status(201).json({
            status: 201,
            message: "Article created successfully",
            data: { ...Object.values(result.rows) }
          });
        }
      })
      .catch(err => {
        console.log("query error", err.message, err.stack);
        const message = "Query error";
        return res.status(422).json({
          status: 422,
          message,
          error: err.message
        });
      });
  }

  static async patchArticle(req, res) {
    const id = func.toInteger(req.params.id);
    const updatedArticle = req.body;
    const authorId = func.toInteger(req.userData.id);

    const isStored = await pool.query(allqueries.getOneArticle, [id]);

    if (isStored.rows.length !== 0) {
      if (isStored.rows[0].authorid === authorId) {
        await pool
          .query(allqueries.updateArticle, [
            id,
            updatedArticle.title || isStored.rows[0].title,
            updatedArticle.article || isStored.rows[0].article,
            updatedArticle.category || isStored.rows[0].category,
            new Date()
          ])
          .then(result => {
            return res.status(200).json({
              status: 200,
              message: "Article edited successfully",
              data: result.rows[0]
            });
          })
          .catch(err => {
            console.log("query error", err.message, err.stack);
            const message = "Query error";
            return res.status(422).json({
              status: 422,
              message,
              error: err.message
            });
          });
      } else {
        return res.status(403).json({
          status: 403,
          error: "You are not allowed to delete this article"
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        error: "Article does not exist"
      });
    }
  }
}

export default ArticleController;
