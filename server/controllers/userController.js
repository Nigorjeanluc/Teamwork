import users from '../models/userModel';
import User from '../models/userClass';
import func from '../helpers/functions';


const userController = {
    signUp: (req, res) => {
        const user = new User(users, req.body.firstName, req.body.lastName, req.body.email, req.body.gender, req.body.jobRole, req.body.department, req.body.address, req.body.password);
        const alreadyUser = func.emailFinder(users, user.email) || func.idFinder(users, user.id);

        if (alreadyUser) {
            return res.status(422).json({
                status: 422,
                message: 'You already have an account',
            });
        }

        const done = users.push(user);
        if (done) {
            const token = func.jwtSign(user.id, user.firstName, user.lastName, user.email);
            return res.status(201).json({
                status: 201,
                message: 'User created successfully',
                token,
            });
        }
    },
    signIn: (req, res) => {
        const userAuth = {
            email: req.body.email,
            password: req.body.password,
        };

        const alreadyUser = func.emailFinder(users, userAuth.email);

        if (alreadyUser) {
            const result = func.comparePassword(userAuth.password, alreadyUser.password);
            if (result) {
                const token = func.jwtSign(alreadyUser.id, alreadyUser.firstName, alreadyUser.lastName, alreadyUser.email);
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
        }
        return res.status(401).json({
            status: 401,
            message: 'Auth failed',
        });
    },
};

export default userController;