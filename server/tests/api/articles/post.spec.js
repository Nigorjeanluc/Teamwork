import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../../../app';

chai.use(chaiHTTP);

describe('Article Controller', () => {
    it('POST /api/v1/articles', () => {
        chai.request(app).post('/api/v1/articles').end((err, res) => {
            expect(res.status).to.equals(201);
            expect(res.body.message).to.be.a('string');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data).not.to.be.empty;
            expect(res.body.data[1].id).equals(2);
        });
    });
});