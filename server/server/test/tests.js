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
  describe('Creating and updating data', () => {
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
  });
  describe('Deleting data', () => {
    it('Delete /api/v1/recipes?:recipeId does get all recipes', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/3')
        .end((err, res) => {
          expect(res.status).equal(200);
          expect(res.body.message).equal('Recipe has been Deleted');
          expect(res.body.message).to.be.a('string');
          done();
        });
    });
  });
  describe('Validating input', () => {
    it('POST /api/v1/recipes valid input for recipeName', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/')
        .send({
          userId: 5,
          recipeName: '',
          mealType: 'lunch',
          description: 'Boil water for five minutes',
          ingredients: 'water, goat, rice, blah,',
        })
        .end((err, res) => {
          expect(res.status).equal(400);
          expect(res.body.message).equal('Please Enter Recipe Name');
          done();
        });
    });
    it('POST /api/v1/recipes valid input for mealType', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/')
        .send({
          userId: 5,
          recipeName: 'Beans',
          mealType: '',
          description: 'Boil water for five minutes',
          ingredients: 'water, goat, rice, blah,',
        })
        .end((err, res) => {
          expect(res.status).equal(400);
          expect(res.body.message).equal('Please Enter the mealType');
          done();
        });
    });
    it('POST /api/v1/recipes valid input for description', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/')
        .send({
          userId: 5,
          recipeName: 'Beans',
          mealType: 'lunch',
          description: '',
          ingredients: 'water, goat, rice, blah,',
        })
        .end((err, res) => {
          expect(res.status).equal(400);
          expect(res.body.message).equal('Please Enter the description to make recipe');
          done();
        });
    });
    it('POST /api/v1/recipes valid input for ingredients', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/')
        .send({
          userId: 5,
          recipeName: 'Beans',
          mealType: 'lunch',
          description: 'Boil water for ten minutes',
          ingredients: '',
        })
        .end((err, res) => {
          expect(res.status).equal(400);
          expect(res.body.message).equal('Please Enter  Ingridents required');
          done();
        });
    });
    it('POST /api/v1/recipes/:recipeId/reviews validate input for reviews', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/3/reviews')
        .send({
          userId: 5,
          review: ""
        })
        .end((err, res) => {
          expect(res.status).equal(400);
          expect(res.body.Message).equal('Please enter Review');
          done();
        });
    });
  });  
});
