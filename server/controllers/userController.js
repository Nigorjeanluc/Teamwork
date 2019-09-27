import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const users = [];

const userController = {
    signUp: (req, res, next) => {
        const user = {
            id: users.length - 1,
            createdOn: Date(Date.now).toString(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gender: req.body.gender,
            jobRole: req.body.jobRole,
            department: req.body.department,
            address: req.body.address,
            password: bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        error: err,
                    });
                }
                const user = {
                    id: parseInt(req.body.id, 10),
                    createdOn: Date(Date.now).toString(),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    gender: req.body.gender,
                    jobRole: req.body.jobRole,
                    department: req.body.department,
                    address: req.body.address,
                    password: hash,
                };

                const alreadyUser = users.find((user) => user.email === req.body.email) || users.find((user) => user.id === parseInt(req.body.id, 10));

                if (alreadyUser) {
                    return res.status(422).json({
                        status: 422,
                        message: 'You already have an account',
                    });
                }

                const done = users.push(user);
                if (done) {
                    const token = jwt.sign({
                        id: user.id,
                        createdOn: user.createdOn,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        gender: user.gender,
                        jobRole: user.jobRole,
                        department: user.department,
                        address: user.address,
                    }, process.env.JWT_KEY, {
                        expiresIn: '1h',
                    });
                    return res.status(201).json({
                        status: 201,
                        message: 'User created successfully',
                        token,
                    });
                }
            }),
        };
    },
    signIn: (req, res, next) => {
        const userAuth = {
            email: req.body.email,
            password: req.body.password,
        };

        const alreadyUser = users.find((user) => user.email === userAuth.email);

        if (alreadyUser) {
            bcrypt.compare(userAuth.password, alreadyUser.password, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(401).json({
                        status: 401,
                        message: 'Auth failed',
                    });
                }

                if (result) {
                    const token = jwt.sign({
                        id: alreadyUser.id,
                        createdOn: alreadyUser.createdOn,
                        firstName: alreadyUser.firstName,
                        lastName: alreadyUser.lastName,
                        email: alreadyUser.email,
                        gender: alreadyUser.gender,
                        jobRole: alreadyUser.jobRole,
                        department: alreadyUser.department,
                        address: alreadyUser.address,
                    }, process.env.JWT_KEY, {
                        expiresIn: '1h',
                    });
                    return res.status(200).json({
                        status: 200,
                        message: 'User is successfully logged in',
                        token,
                    });
                }
                return res.status(401).json({
                    status: 401,
                    message: 'Wrong password',
                });
            });
        } else {
            return res.status(401).json({
                status: 401,
                message: 'Auth failed',
            });
        }
    },
};

export default userController;