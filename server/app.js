import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import articleRoutes from './routes/articleRoutes';
import userRoutes from './routes/userRoutes';
import commentRoutes from './routes/commentRoutes';

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

app.use(userRoutes);
app.use(articleRoutes);
app.use(commentRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        status: error.status,
        message: error.message,
    });
});

app.listen(port, () => {
    console.log(`Server is running on (http://127.0.0.1:${port})`);
});

export default app;