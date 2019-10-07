import express from 'express';
import articleRoutes from './articleRoutes';
import commentRoutes from './commentRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

// Ensure that I prevent CORS errors
router.use((req, res, next) => {
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


router.use(articleRoutes);
router.use(commentRoutes);
router.use(userRoutes);

export default router;