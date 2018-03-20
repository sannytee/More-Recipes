import { expect } from 'chai';
import faker from 'faker';
import models from '../../models';

const { Users } = models;

const userData = {
  username: faker.name.firstName(),
  password: faker.name.lastName(),
  email: faker.internet.email(),
};
describe('User model', () => {
  it('throws error if username is not provided', (done) => {
    Users
      .create({
        email: 'testing@gmail.com',
        password: 'example2018'
      })
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Users.username cannot be null');
        done();
      });
  });
  it('throws error if email is not provided', (done) => {
    Users
      .create({
        username: 'softwaredev',
        password: 'example2018'
      })
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Users.email cannot be null');
        done();
      });
  });
  it('throws error if password is not provided', (done) => {
    Users
      .create({
        username: 'softwaredev',
        email: 'testing@gmail.com',
        password: ''
      })
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Password is required');
        done();
      });
  });
  it('creates an account with valid details', (done) => {
    Users
      .create({
        username: userData.username,
        email: userData.email,
        password: userData.password
      })
      .then((user) => {
        expect(user.dataValues.username).to.be.a('string');
        expect(user.dataValues.email).to.be.a('string');
        expect(user.dataValues.password).to.be.a('string');
        expect(user.dataValues.username).to.equal(userData.username);
        expect(user.dataValues.email).to.equal(userData.email);
        expect(user.dataValues.password).to.equal(userData.password);
        done();
      });
  });
});
