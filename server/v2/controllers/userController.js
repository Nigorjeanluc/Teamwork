import User from '../models/userClass';
import func from '../helpers/functions';
import userFunc from '../helpers/userFunc';
import pool from '../models/dbConnect';
import allqueries from '../models/allqueries';

const userController = {
    signUp: async (req, res) => {
        const user = new User(req.body.firstName, req.body.lastName, req.body.email, req.body.gender, req.body.jobRole, req.body.department, req.body.address, req.body.password);

        const alreadyUser = await pool.query(allqueries.getAnEmployee,[user.email]);

        if (alreadyUser.rows[0]) {
            return res.status(422).json({
                status: 422,
                message: 'You already have an account',
            });
        }

        user.password = func.hashPassword(req.body.password);
        const done = await pool.query(allqueries.insertEmployee, [
            user.firstName,
            user.lastName,
            user.email,
            user.gender,
            user.jobRole,
            user.department,
            user.address,
            user.isAdmin,
            user.password,
            user.createdOn
        ]);

        const message = 'User created successfully';

        userFunc.jwtFunc(done.rows[0], res, user.id, user.firstName, user.lastName, user.email, 201, message);
    },
    signIn: async (req, res) => {
        const userAuth = {
            email: req.body.email,
            password: req.body.password,
        };

        const alreadyUser = await pool.query(allqueries.getAnEmployee, [userAuth.email]);

        if (alreadyUser.rows[0]) {
            const result = func.comparePassword(userAuth.password, alreadyUser.rows[0].password);
            const message = 'User is successfully logged in';
            userFunc.jwtFunc(result, res, alreadyUser.rows[0].id, alreadyUser.rows[0].firstName, alreadyUser.rows[0].lastName, alreadyUser.rows[0].email, 200, message);

            return res.status(401).json({
                status: 401,
                message: 'Wrong password',
            });
        }
        return res.status(401).json({
            status: 401,
            message: 'Auth failed',
        });
    },
};

export default userController;