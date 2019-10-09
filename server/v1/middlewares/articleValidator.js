import Joi from 'joi';
import Article from '../models/articleClass';

const articleValidation = {
    postValidator: (req, res, next) => {
        const Schema = Joi.object().keys({
            id: Joi.number().integer().required(),
            createdOn: Joi.string().required(),
            title: Joi.string().min(5).max(100).label('Title').required(),
            article: Joi.string().min(5).max(1000).label('Article').required(),
            authorId: Joi.number().allow().label('Author_id'),
            category: Joi.string().min(2).max(20).alphanum().label('Catedory').trim().required(),
            isInappropiate: Joi.boolean().label('Appropriate').required(),
            comments: Joi.required(),
        });

        const article = new Article(req.body.title, req.body.article, req.body.category, req.userData.id);

        const result = Joi.validate(article, Schema, {
            abortEarly: false
        });
        const valid = result.error == null;

        if (valid) {
            return next();
        } else {
            const details = result.error.details;
            const message = details.map(i => i.message.replace('"', '').replace('"', '')).join(', ');

            return res.status(422).json({
                status: 422,
                error: message,
            });
        }
    },
    patchValidator: (req, res, next) => {
        var Schema = Joi.alternatives().try(
            Joi.object().keys({
                title: Joi.string().min(5).max(40).label('Title').allow(''),
                article: Joi.string().min(5).max(1000).label('Article'),
            }),
            Joi.object().keys({
                title: Joi.string().min(5).max(40).label('Title'),
                article: Joi.string().min(5).max(1000).label('Article').allow(''),
            }),
        );

        const articleCheck = {
            title: req.body.title,
            article: req.body.article,
        };
        const result = Joi.validate(articleCheck, Schema, {
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
    },
}

export default articleValidation;