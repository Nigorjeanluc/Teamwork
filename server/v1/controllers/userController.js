import users from '../models/userModel';
import User from '../models/userClass';
import func from '../helpers/functions';
import userFunc from '../helpers/userFunc';


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

        user.password = func.hashPassword(req.body.password);

        const done = users.push(user);

        const message = 'User created successfully';

        userFunc.jwtFunc(done, res, user.id, user.firstName, user.lastName, user.email, 201, message);
    },
    signIn: (req, res) => {
        const userAuth = {
            email: req.body.email,
            password: req.body.password,
        };

        const alreadyUser = func.emailFinder(users, userAuth.email);

        if (alreadyUser) {
            const result = func.comparePassword(userAuth.password, alreadyUser.password);
            const message = 'User is successfully logged in';
            userFunc.jwtFunc(result, res, alreadyUser.id, alreadyUser.firstName, alreadyUser.lastName, alreadyUser.email, 200, message);

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