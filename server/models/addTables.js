import pool from "./dbConnect";
import addTable from "./allqueries";
import dotenv from "dotenv";

dotenv.config();

const addTables = async () => {
  await pool.query(addTable.createUsersTable);
  await pool.query(addTable.createArticlesTable);
  process.stdout.write(
    "Two Tables (employees and articles) created successfully\n"
  );
};

(async () => {
  await pool.query(addTables);
})().catch(error => process.stdout.write(`${error}\n`));

export default addTables;
