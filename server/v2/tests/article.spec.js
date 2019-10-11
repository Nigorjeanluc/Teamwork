import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import app from '../../app';
import func from '../helpers/functions';
import Article from '../models/articleClass';
import pool from '../models/dbConnect';
import allqueries from '../models/allqueries';

dotenv.config();

const user = {
    createdOn: new Date().toDateString,
    firstName: 'Jean Jaures',
    lastName: 'SIBOMANA',
    email: 'jaures@gmail.com',
    gender: 'Male',
    jobRole: 'CEO',
    department: 'Leadership',
    isAdmin: false,
    address: 'KG 54 Kibagabaga',
    password: bcrypt.hashSync('123456789', 10)
};

const article = new Article(
    'Title One',
    'Article contents. Article contents. Article contents. Article contents.',
    'Fashion',
    1200
);


const invalidArticle = new Article(
    '',
    'Article contents. Article contents. Article contents. Article contents.',
    'Fashion',
    1200
);

const result = async() => {
    await pool.query(allqueries.insertEmployee, [
        user.firstName,
        user.lastName,
        user.email,
        user.gender,
        user.jobRole,
        user.department,
        user.address,
        user.isAdmin,
        func.hashPassword(user.password),
        user.createdOn
    ]);
}


const token = jwt
    .sign({ id: 12, access: 'auth' }, process.env.JWT_KEY, {
        expiresIn: '1h'
    });

chai.use(chaiHTTP);

describe('GET /api/v1/feeds', () => {
    it('should return all feeds in desc order', () => {
        chai
            .request(app)
            .get('/api/v2/feeds')
            .end((err, res) => {
                expect(res.status).to.equals(200);
            });
    });
});

describe('POST /api/v2/articles', () => {
    it('should not post an invalid article', () => {
        chai
            .request(app)
            .post('/api/v2/articles')
            .send(invalidArticle)
            .set('Authorization', `Bear ${token}`)
            .end((err, res) => {
                expect(res.status).to.equals(422);
                expect(res.body).to.be.an('object');
                expect(res.body.error).to.be.a('string');
            });
    });

    it('should not post an article from unauthenticated user', () => {
        chai
            .request(app)
            .post('/api/v2/articles')
            .send(article)
            .end((err, res) => {
                expect(res.status).to.equals(401);
                expect(res.body).to.be.an('object');
                expect(res.body.error).to.be.a('string');
            });
    });

    it('should post new article', () => {
        chai
            .request(app)
            .post('/api/v2/articles')
            .send(article)
            .set('Authorization', `Bear ${token}`)
            .end((err, res) => {
                expect(res.status).to.equals(201);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.be.a('string');
            });
    });
});

describe(`GET /api/v2/articles/:id`, () => {
    it('should return the targeted article', () => {
        chai
            .request(app)
            .get(`/api/v2/articles/1`)
            .set('Authorization', `Bear ${token}`)
            .end((err, res) => {
                expect(res.status).to.equals(200);
            });
    });
});

describe(`GET /api/v2/articles/:id/comments`, () => {
    it(`POST /api/v2/articles/:id/comments`, () => {
        chai
            .request(app)
            .post(`/api/v2/articles/1/comments`)
            .send({
                articleId: 1,
                createdOn: new Date(),
                authorId: 1,
                comment: 'New comment. New comment. New comment. New comment. New comment.'
            })
            .set('Authorization', `Bear ${token}`)
            .end((err, res) => {
                expect(res.status).to.equals(201);
            });
    });

    it(`PATCH /api/v2/articles/1`, () => {
        chai
            .request(app)
            .patch(`/api/v2/articles/1`)
            .send({ title: 'Title Two', article: 'Nothing but Dev thing' })
            .set('Authorization', `Bear ${token}`)
            .end((err, res) => {
                expect(res.status).to.equals(200);
            });
    });

    it(`DELETE /api/v2/articles/1`, () => {
        chai
            .request(app)
            .delete(`/api/v2/articles/1`)
            .set('Authorization', `Bear ${token}`)
            .end((err, res) => {
                expect(res.status).to.equals(204);
            });
    });
});