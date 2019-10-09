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
          FOREIGN KEY (authorId) REFERENCES employees(id) ON DELETE CASCADE
)`;

const createCommentsTable = `
    CREATE TABLE IF NOT EXISTS
        comments(
          id SERIAL PRIMARY KEY,
          comment VARCHAR(255) NOT NULL,
          isInappropriate VARCHAR(255) NOT NULL,
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
    RETURNING firstName, lastName, email, gender, jobRole, department, address, isAdmin, password, createdOn`;

const getAllEmployees = `SELECT * FROM employees`;

const getAllArticles = `SELECT * FROM articles ORDER BY id DESC`;

const getAnEmployee = `SELECT * FROM employees WHERE email = $1 OR password = $2`;

export default {
    createUsersTable,
    createArticlesTable,
    createCommentsTable,
    deleteAllTables,
    insertEmployee,
    getAllEmployees,
    getAllArticles,
    getAnEmployee
};