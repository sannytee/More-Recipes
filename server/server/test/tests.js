import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import { Users, Recipes, reviews, favorites} from '../models';

const expect = chai.expect;

chai.use(chaiHttp);

Users.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

Recipes.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

reviews.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

favorites.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

let token;

describe('More-Recipe Tests:', () => {
  describe('Test for User', () => {
    it('POST /api/v1/users/signup does create new user', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send({
          username: 'Thywo',
          email: 'example@gmail.com',
          password: 'example97'
        })
        .end((err, res) => {
          expect(res.body.success).equal(true);
          expect(res.status).equal(201);
          expect(res.body.message).equal('Account created');
          expect(res.body.username).equal('Thywo');
          done();
        });
    });
    it('POST /api/v1/users/signin does allow user to signin with username', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({
          username: 'Thywo',
          password: 'example97'
        })
        .end((err, res) => {
          expect(res.body.success).equal(true);
          expect(res.status).equal(200);
          token = res.body.token;
          expect(res.body.message).equal('Token Generated. Signin successful!');
          done();
        });
    });
    it('POST /api/v1/users/signin does allow user to signin with email', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({
          email: 'example@gmail.com',
          password: 'example97'
        })
        .end((err, res) => {
          expect(res.body.success).equal(true);
          expect(res.status).equal(200);
          expect(res.body.message).equal('Token Generated. Signin successful!');
          done();
        });
    });
    it('returns 400 error when password parameter is not given', (done) => {
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
    it('returns 400 error when email parameter is not given', (done) => {
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
  });
  describe('Test for Recipe', () => {
    it('POST /api/v1/recipes does create   recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/')
        .set('x-access-token', token)
        .type('form')
        .send({
          recipeName: 'Goat',
          mealType: 'breakfast',
          ingredients: 'water, beans,hfj',
          description: 'Buy the meat from market',
          method: 'fry the yam for five minutes'
        })
        .end((err, res) => {
          expect(res.status).equal(201);
          expect(res.body.message).equal('Recipe successfully added');
          done();
        });
    });
    it('POST /api/v1/recipes does create   recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/')
        .set('x-access-token', token)
        .type('form')
        .send({
          recipeName: 'Goatsoup',
          mealType: 'breakfast',
          ingredients: 'water, beans,hfj',
          description: 'Buy the meat from market',
          method: 'fry the yam for five minutes'
        })
        .end((err, res) => {
          expect(res.status).equal(201);
          expect(res.body.message).equal('Recipe successfully added');
          done();
        });
    });
    it('PUT /api/v1/recipes/recipeId does update recipe', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .set('x-access-token', token)
        .type('form')
        .send({
          recipeName: 'Meat',
        })
        .end((err, res) => {
          expect(res.status).equal(200);
          expect(res.body.message).equal('Recipe successfully updated');
          done();
        });
    });
    it('DELETE /api/v1/recipes/recipeId does delete recipe', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/2')
        .set('x-access-token', token)
        .type('form')
        .end((err, res) => {
          expect(res.status).equal(200);
          expect(res.body.message).equal('recipe successfully deleted');
          done();
        });
    });
    it('GET /api/v1/recipes does get all recipe', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('GET /api/v1/recipes does get a recipe', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/1')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).equal(200);
          expect(res.body.id).equal(1);
          done();
        });
    });
  });
});
