import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import { Users } from '../../models';

const { expect } = chai;

chai.use(chaiHttp);
let token;

describe('User API Route', () => {
  before((done) => {
    Users.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });
    done();
  });
  it('throw error for username less than six characters', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'exam',
        email: 'example@gmail.com',
        password: 'example',
        confirmPassword: 'example970'
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.error).equal('Username must be greater than 5');
        done();
      });
  });
  it('throw error if password does not match', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'example',
        email: 'example@gmail.com',
        password: 'example',
        confirmPassword: 'example970'
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.error).equal('Password does not match');
        done();
      });
  });
  it('creates a new user with valid details', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'example20',
        email: 'example20@gmail.com',
        password: 'example97',
        confirmPassword: 'example97'
      })
      .end((err, res) => {
        expect(res.body.success).equal(true);
        expect(res.status).equal(201);
        expect(res.body.message).equal('Account created');
        expect(res.body.username).equal('example20');
        done();
      });
  });
  it('throws error for invalid login details', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'example20',
        password: 'exampl'
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.error).equal('Incorrect Login details');
        done();
      });
  });
  it('allow user to signin with username', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'example20@gmail.com',
        password: 'example97'
      })
      .end((err, res) => {
        expect(res.body.success).equal(true);
        expect(res.status).equal(200);
        expect(res.body.message).equal('Token Generated. Signin successful!');
        done();
      });
  });
  it('allow user to signin with email', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'example20@gmail.com',
        password: 'example97'
      })
      .end((err, res) => {
        expect(res.body.success).equal(true);
        expect(res.status).equal(200);
        const value = res.body.token;
        token = value;
        expect(res.body.message).equal('Token Generated. Signin successful!');
        done();
      });
  });
  it('allows user to get their profile details', (done) => {
    chai.request(app)
      .get('/api/v1/users/1/profile')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.profile.id).equal(1);
        expect(res.body.profile.username).equal('example20');
        expect(res.body.profile.email).equal('example20@gmail.com');
        done();
      });
  });
  it('throws error for signin when password parameter is not given', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .type('form')
      .send({
        email: 'example@gmail.com',
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        done();
      });
  });
  it('throws error for signup when email parameter is not given', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .type('form')
      .send({
        password: 'naruto'
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        done();
      });
  });
  it('throws error for signing up with invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .type('form')
      .send({
        username: 'boruto',
        email: 'examplegmaicom',
        password: 'naruto',
        confirmPassword: 'naruto'
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.error).equal('This email is invalid');
        done();
      });
  });
  it('throws error for signing up with exist username', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .type('form')
      .send({
        username: 'example20',
        email: 'eample.@gmail.com',
        password: 'naruto',
        confirmPassword: 'naruto'
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.error).equal('This username already exist');
        done();
      });
  });
  it('throws error  for signing up with  exist email', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .type('form')
      .send({
        username: 'borutod',
        email: 'example20@gmail.com',
        password: 'naruto',
        confirmPassword: 'naruto'
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.error).equal('This email already exists');
        done();
      });
  });

  it('throws error  for signing in with a nn-registered account', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .type('form')
      .send({
        username: 'borutod',
        password: 'naruto',
        confirmPassword: 'naruto'
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.error).equal('User not found');
        done();
      });
  });

  it('throws error to get profile details without token', (done) => {
    chai.request(app)
      .get('/api/v1/users/1/profile')
      .end((err, res) => {
        expect(res.status).equal(403);
        expect(res.body.message).equal('You are not authorized');
        done();
      });
  });
});
