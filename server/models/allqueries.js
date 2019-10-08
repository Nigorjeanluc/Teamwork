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
          article VARCHAR(255) NOT NULL,
          category VARCHAR(255) NOT NULL,
          isInappropriate VARCHAR(255) NOT NULL,
          authorId INT NOT NULL,
          createdOn timestamp without time zone,
          FOREIGN KEY (authorId) REFERENCES employees(id) ON DELETE CASCADE
)`;

const deleteAllTables = `
    DROP TABLE IF EXISTS 
        employees, articles`;

export default {
    createUsersTable,
    createArticlesTable,
    deleteAllTables
};