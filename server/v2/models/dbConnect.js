import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let pool = {};

if (process.env.NODE_ENV == "test") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL_TEST
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
}

if (process.env.NODE_ENV == "pro") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL_PRO
  });
}

pool.on("connect", () => process.stdout.write("Connected to database...\n"));

export default pool;
