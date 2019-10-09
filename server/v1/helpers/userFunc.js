import func from '../helpers/functions';

const userFunc = {
    jwtFunc: (condition, res, userId, userFirstname, userLastname, userEmail, httpCode, message) => {
        if (condition) {
            const token = func.jwtSign(userId, userFirstname, userLastname, userEmail);
            return res.status(httpCode).json({
                status: httpCode,
                message,
                token,
            });
        }
    },
}

export default userFunc;