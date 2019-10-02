import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../app';


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

chai.use(chaiHTTP);

describe('User Controller', () => {
    it('POST /api/v1/auth/signup', () => {
        chai.request(app).get('api/v1/auth/signup/').send(user).end((err, res) => {
            expect(res.status).to.equals(201);
            expect(res.body).to.be.an('object');
            expect(res.body.token).to.be.a('string');
        });
    });

    it('POST /api/v1/auth/signin', () => {
        chai.request(app).get('api/v1/auth/signin/').send({ email: user.email, password: `${user.password}` }).end((err, res) => {
            expect(res.status).to.equals(404);
            expect(res.body).to.be.an('object');
            expect(res.body.token).to.be.a('string');
            console.log(res.body.token);
        });
    });
});