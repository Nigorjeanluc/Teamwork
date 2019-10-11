const createUsersTable = `
    CREATE TABLE IF NOT EXISTS 
        employees (
            id  SERIAL PRIMARY KEY,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            gender VARCHAR(10) NOT NULL,
            jobRole VARCHAR(50) NOT NULL,
            department VARCHAR(50) NOT NULL,
            address VARCHAR(100) NOT NULL,
            isAdmin boolean NOT NULL,
            password VARCHAR(255) NOT NULL,
            createdOn timestamp without time zone
)`;

const createArticlesTable = `
    CREATE TABLE IF NOT EXISTS
        articles(
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          article TEXT NOT NULL,
          category VARCHAR(255) NOT NULL,
          isInappropriate VARCHAR(255) NOT NULL,
          authorId INT NOT NULL,
          createdOn timestamp without time zone,
          updatedOn timestamp without time zone,
          FOREIGN KEY (authorId) REFERENCES employees(id) ON DELETE CASCADE
)`;

const createCommentsTable = `
    CREATE TABLE IF NOT EXISTS
        comments(
          id SERIAL PRIMARY KEY,
          comment VARCHAR(255) NOT NULL,
          isInappropriate VARCHAR(255) NOT NULL,
          authorId INT NOT NULL,
          articleId INT NOT NULL,
          createdOn timestamp without time zone,
          FOREIGN KEY (articleId) REFERENCES articles(id) ON DELETE CASCADE
)`;

const deleteAllTables = `
    DROP TABLE IF EXISTS 
        employees, articles, comments`;

const insertEmployee = `
    INSERT INTO 
        employees (firstName, lastName, email, gender, jobRole, department, address, isAdmin, password, createdOn)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING id, firstName, lastName, email, gender, jobRole, department, address, isAdmin, password, createdOn`;

const insertArticle = `
    INSERT INTO 
        articles (title, article, category, isInappropriate, authorId, createdOn, updatedOn)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;

const insertComment = `
    INSERT INTO 
        comments (comment, isInappropriate, authorId, articleId, createdOn)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;

const getAllEmployees = `SELECT * FROM employees`;

const getOneArticle = `SELECT * FROM articles WHERE id = $1`;

const getMyArticles = `SELECT * FROM articles WHERE authorId = $1 ORDER BY id DESC`;

const getAllArticles = `SELECT * FROM articles ORDER BY id DESC`;

const updateArticle = `UPDATE articles 
                        SET title = $2, article = $3, category = $4, updatedOn = $5  WHERE id = $1 
                        RETURNING * `;

const deleteArticle = `DELETE FROM articles WHERE id = $1`;

const getAnEmployee = `SELECT * FROM employees WHERE email = $1`;

export default {
    createUsersTable,
    createArticlesTable,
    createCommentsTable,
    deleteAllTables,
    insertEmployee,
    insertArticle,
    insertComment,
    updateArticle,
    deleteArticle,
    getAllEmployees,
    getAllArticles,
    getMyArticles,
    getOneArticle,
    getAnEmployee
};