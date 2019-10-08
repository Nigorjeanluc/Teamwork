import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import users from '../models/userModel';
import User from '../models/userClass';
import app from '../app';
import func from '../helpers/functions';


const user = new User(users, 'Jean Jaures', 'SIBOMANA', `${func.randomString(6)}@gmail.com`, 'Male', 'Learning Facilitator', 'Department', 'KG 54 Kibagabaga', '123456789');


chai.use(chaiHTTP);

describe('User Controller', () => {
    it('POST /api/v1/auth/signup', () => {
        chai.request(app).post('/api/v1/auth/signup').send(user).end((err, res) => {
            expect(res.status).to.equals(201);
            expect(res.body).to.be.an('object');
            expect(res.body.token).to.be.a('string');
        });
    });

    it('POST /api/v1/auth/signin', () => {
        chai.request(app).post('/api/v1/auth/signin').send({ email: user.email, password: `${user.password}` }).end((err, res) => {
            expect(res.status).to.equals(200);
            expect(res.body).to.be.an('object');
            expect(res.body.token).to.be.a('string');
        });
    });
});