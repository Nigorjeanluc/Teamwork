import pool from "./dbConnect";
import addTable from "./allqueries";
import func from '../helpers/functions'
import dotenv from "dotenv";

dotenv.config();

const addTables = async () => {
  await pool.query(addTable.createUsersTable);
  await pool.query(addTable.createArticlesTable);
  await pool.query(addTable.createCommentsTable);
  process.stdout.write(
    "Three Tables (employees ,articles and comments) created successfully\n"
  );
};

func.execQuery(addTables);

export default addTables;
