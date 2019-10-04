import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const func = {
    randomString: (length) => {
        const result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
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
    hashPassword: (password) => bcrypt.hash(password, 10, (err, hash) => hash),
    comparePassword: (password, matchPassword) => bcrypt.compareSync(password, matchPassword),
};

export default func;