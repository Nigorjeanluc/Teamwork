import express from "express";
import dotenv from "dotenv";

import allRoutes from "./v2/routes/allRoutes";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v2", allRoutes);

app.listen(port, () => {
  process.stdout.write(`Server is running on (http://127.0.0.1:${port})\n`);
});

export default app;
