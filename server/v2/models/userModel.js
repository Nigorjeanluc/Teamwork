import pool from 'pg';
import allqueries from '../models/allqueries';

class UserModel {
    static async createUser (user) {
        await pool.query(allqueries.insertEmployee, [
            user.firstName,
            user.lastName,
            user.email,
            user.gender,
            user.jobRole,
            user.department,
            user.address,
            user.isAdmin,
            func.hashPassword(req.body.password),
            user.createdOn
            ]).then((result) => {
            const message = "User created successfully";
            const token = func.jwtSign(result.rows[0].id, result.rows[0].email);
            return res.status(201).json({
                status: 201,
                message,
                data: {
                    token,
                }
            });
            }).catch(err => {
            console.log('query error', e.message, e.stack);
            const message = "Query error";
            return res.status(201).json({
                status: 201,
                message,
                error: err.message
            });
            });
    }
}

export default UserModel;