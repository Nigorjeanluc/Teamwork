import Joi from 'joi';
import User from '../models/userClass';

class AuthValidation {
    static signupValidator (req, res, next) {
        const Schema = Joi.object().keys({
            createdOn: Joi.date().required(),
            firstName: Joi.string().min(3).max(40).label('First Name').trim().required(),
            lastName: Joi.string().min(3).max(40).label('Last Name').trim().required(),
            email: Joi.string().email({ minDomainAtoms: 2 }).label('Email').trim().required(),
            gender: Joi.string().min(4).max(6).label('Gender').trim().required(),
            jobRole: Joi.string().min(4).label('Job Role').trim().required(),
            isAdmin: Joi.boolean(),
            department: Joi.string().min(4).label('Department').trim().required(),
            address: Joi.string().label('Address').min(4).required(),
            password: Joi.string().label('Password').trim().required(),
        });

        const user = new User(req.body.firstName, req.body.lastName, req.body.email, req.body.gender, req.body.jobRole, req.body.department, req.body.address, req.body.password);

        const result = Joi.validate(user, Schema, {
            abortEarly: false
        });
        const valid = result.error == null;

        if (valid) {
            req.header('Content-Type', 'application/json');
            return next();
        } else {
            const details = result.error.details;
            const message = details.map(i => i.message.replace('"', '').replace('"', '')).join(',');

            return res.status(422).json({
                status: 422,
                error: message,
            });
        }
    }

    static signinValidator (req, res, next) {
        const Schema = Joi.object().keys({
            email: Joi.string().email({ minDomainAtoms: 2 }).label('Email').trim().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).label('Password').trim().required(),
        });

        const userCheck = {
            email: req.body.email,
            password: req.body.password,
        };
        const result = Joi.validate(userCheck, Schema, {
            abortEarly: false
        });

        const valid = result.error == null;

        if (valid) {
            return next();
        } else {
            const details = result.error.details;
            const message = details.map(i => i.message.replace('"', '').replace('"', '')).join(',');

            return res.status(422).json({
                status: 422,
                error: message,
            });
        }
    }
}

export default AuthValidation;