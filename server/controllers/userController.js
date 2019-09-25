import bcrypt from 'bcrypt';

const users = [];

const userController = {
    signUp: (req, res, next) => {
        const user = {
            id: parseInt(req.body.id, 10),
            createdOn: Date(Date.now).toString(),
            email: req.body.email,
            password: bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err,
                    });
                }
                const user = {
                    id: parseInt(req.body.id, 10),
                    createdOn: Date(Date.now).toString(),
                    email: req.body.email,
                    password: hash,
                };

                const alreadyUser = users.find((user) => user.email === req.body.email);

                if (alreadyUser) {
                    return res.status(200).json({
                        status: 200,
                        message: 'You already have an account',
                    });
                }

                const done = users.push(user);
                if (done) {
                    return res.status(201).json({
                        status: 201,
                        message: 'User created successfully',
                        data: user,
                    });
                }
            }),
        };
    },
};

export default userController;