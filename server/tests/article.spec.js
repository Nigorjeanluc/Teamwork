import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import app from '../app';

dotenv.config();

const user = {
    id: 1200,
    createdOn: new Date().toDateString,
    firstName: 'Jean Jaures',
    lastName: 'SIBOMANA',
    email: 'jaures@gmail.com',
    gender: 'Male',
    jobRole: 'CEO',
    department: 'Leadership',
    address: 'KG 54 Kibagabaga',
    password: bcrypt.hashSync('123456789', 10),
};

const article = {
    id: 8,
    createdOn: new Date().toString(),
    title: 'Title One',
    article: 'Article contents. Article contents. Article contents. Article contents.',
    authorId: 54,
    comments: [{
        id: 1,
        authorId: 2,
        comment: 'Nothing but G thing. Nothing but G thing. Nothing but G thing.',
    }],
    // eslint-disable-next-line newline-per-chained-call
};

const token = jwt.sign({ id: user.id, access: 'auth' }, process.env.JWT_KEY, { expiresIn: '1h' }).toString();

chai.use(chaiHTTP);

describe('Article Controller', () => {
    it('GET /api/v1/feeds', () => {
        chai.request(app).get('/api/v1/feeds').set('Authorization', `Bear ${token}`).end((err, res) => {
            expect(res.status).to.equals(200);
        });
        // expect({ id: 1 }).to.be.an('object');
        // eslint-disable-next-line no-unused-expressions
        // expect([2, 3]).to.be.empty;
        // expect(1).to.equals(1);
    });

    it('POST /api/v1/articles', () => {
        chai.request(app).post('/api/v1/articles').send(article).set('Authorization', `Bear ${token}`).end((err, res) => {
            expect(res.status).to.equals(201);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.be.a('string');
        });
    });

    it(`GET /api/v1/articles/${article.id}`, () => {
        chai.request(app).get(`/api/v1/articles/${article.id}`).set('Authorization', `Bear ${token}`).end((err, res) => {
            expect(res.status).to.equals(200);
        });
        // expect({ id: 1 }).to.be.an('object');
        // eslint-disable-next-line no-unused-expressions
        // expect([2, 3]).to.be.empty;
        // expect(1).to.equals(1);
    });

    it(`POST /api/v1/articles/${article.id}/comments`, () => {
        chai.request(app).post(`/api/v1/articles/${article.id}/comments`).send({
                id: article.comments.length + 1,
                articleId: 1,
                createdOn: new Date().toLocaleString(),
                // eslint-disable-next-line max-len
                articleTitle: article.title,
                // eslint-disable-next-line max-len
                article: article.article,
                authorId: 10,
                comments: 'New comment. New comment. New comment. New comment. New comment.',
            }).set('Authorization', `Bear ${token}`)
            .end((err, res) => {
                expect(res.status).to.equals(201);
            });
        // expect({ id: 1 }).to.be.an('object');
        // eslint-disable-next-line no-unused-expressions
        // expect([2, 3]).to.be.empty;
        // expect(1).to.equals(1);
    });

    it(`PATCH /api/v1/articles/${article.id}`, () => {
        chai.request(app).patch(`/api/v1/articles/${article.id}`).send({ title: 'Title Two', article: 'Nothing but Dev thing' }).set('Authorization', `Bear ${token}`)
            .end((err, res) => {
                expect(res.status).to.equals(200);
            });
        // expect({ id: 1 }).to.be.an('object');
        // eslint-disable-next-line no-unused-expressions
        // expect([2, 3]).to.be.empty;
        // expect(1).to.equals(1);
    });

    it(`DELETE /api/v1/articles/${article.id}`, () => {
        chai.request(app).delete(`/api/v1/articles/${article.id}`).set('Authorization', `Bear ${token}`).end((err, res) => {
            expect(res.status).to.equals(204);
        });
        // expect({ id: 1 }).to.be.an('object');
        // eslint-disable-next-line no-unused-expressions
        // expect([2, 3]).to.be.empty;
        // expect(1).to.equals(1);
    });
});