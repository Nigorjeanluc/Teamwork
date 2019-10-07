import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const func = {
    randomString: (length) => {
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        console.log(result);
        return result;
    },
    idFinder: (items, id) => items.find((item) => item.id === id),
    emailFinder: (items, email) => items.find((item) => item.email === email),
    idIncrementor: (arr) => arr.length + 1,
    toInteger: (id) => parseInt(id, 10),
    jwtSign: (id, email) => jwt.sign({
        id,
        email,
    }, process.env.JWT_KEY, {
        expiresIn: '1h',
    }),
    hashPassword: (password) => bcrypt.hashSync(password, 10),
    comparePassword: (password, matchPassword) => bcrypt.compareSync(password, matchPassword),
};

export default func;