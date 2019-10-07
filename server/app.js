import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import allRoutes from './routes/allRoutes';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', allRoutes);

app.listen(port, () => {
    process.stdout.write(`Server is running on (http://127.0.0.1:${port})\n`);
});

export default app;