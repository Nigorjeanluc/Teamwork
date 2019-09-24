import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import articleRoutes from './routes/articleRoutes';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Ensure that I prevent CORS errors
// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
    // Provide access to any domain
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

app.use(articleRoutes);

app.get('/', (req, res) => {
    res.send({ status: 200, message: 'Welcome to TeamWork Application' });
});

app.get('/*', (req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => {
    console.log(`Server is running on (http://127.0.0.1:${port})`);
});

export default app;