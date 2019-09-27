// import app from '../app';
import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';

chai.use(chaiHTTP);

describe('Article Controller', () => {
    it('GET /api/v1/articles', () => {
        chai.request(app).get('/api/v1/articles').end((err, res) => {
            expect(res.status).to.equals(200);
        });
        // expect({ id: 1 }).to.be.an('object');
        // eslint-disable-next-line no-unused-expressions
        // expect([2, 3]).to.be.empty;
        // expect(1).to.equals(1);
    });

    it('POST /api/v1/articles', () => {
        chai.request(app).post('/api/v1/articles').send({
            id: 1,
            createdOn: 'in the future',
            title: 'Title One',
            article: 'Article contents. Article contents. Article contents. Article contents.',
            authorId: 'Jay Jay',
            comments: [{
                id: 1,
                authorId: 2,
                comment: 'Nothing but G thing. Nothing but G thing. Nothing but G thing.'
            }],
        }).end((err, res) => {
            expect(res.status).to.equals(401);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.be.a('string');
            console.log(res.body);
        });
    });
});