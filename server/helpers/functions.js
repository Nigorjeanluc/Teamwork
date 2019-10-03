import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const func = {
    idFinder: (items, id) => items.find((item) => item.id === id),
    emailFinder: (items, email) => items.find((item) => item.email === email),
    idIncrementor: (arr) => arr.length + 1,
    toInteger: (id) => parseInt(id, 10),
    jwtSign: (id, firstname, lastname, email) => jwt.sign({
        id,
        firstName: firstname,
        lastName: lastname,
        email,
    }, process.env.JWT_KEY, {
        expiresIn: '1h',
    }),
    hashPassword: (password) => bcrypt.hashSync(password, 10),
    comparePassword: (password, matchPassword) => bcrypt.compareSync(password, matchPassword),
};

export default func;