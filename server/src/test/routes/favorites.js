import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import { favorites, Recipes } from '../../models';

const {
  expect
} = chai;

chai.use(chaiHttp);
let token;

describe('Favorite API route', () => {
  before((done) => {
    favorites.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });
    Recipes
      .create({
        userId: 1,
        addedBy: 'tester',
        recipeName: 'great food',
        mealType: 'lunch',
        description: 'awesome',
        method: 'reseach that',
        ingredients: 'beans',
        image: 'hdhj'
      });
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'tester007',
        password: 'example97'
      })
      .end((err, res) => {
        const value = res.body.token;
        token = value;
        done();
      });
  });
  it('throws error to favorite recipe that does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/users/1/recipes')
      .set('x-access-token', token)
      .send({
        recipeId: 4
      })
      .end((err, res) => {
        expect(res.body.error).equal('Recipe not found');
        expect(res.status).equal(404);
        done();
      });
  });
  it('should allow  user to favorite  a recipe', (done) => {
    chai.request(app)
      .post('/api/v1/users/1/recipes')
      .set('x-access-token', token)
      .send({
        recipeId: 1
      })
      .end((err, res) => {
        expect(res.body.message).equal('Recipe Favorited');
        expect(res.status).equal(201);
        expect(res.body.favorited).to.be.an('object');
        done();
      });
  });

  it('allows user to get their favorite recipe', (done) => {
    chai.request(app)
      .get('/api/v1/users/1/recipes')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.favorited).to.be.an('array');
        done();
      });
  });

  it('allows user to remove recipe from favorite', (done) => {
    chai.request(app)
      .post('/api/v1/users/1/recipes')
      .set('x-access-token', token)
      .send({
        recipeId: 1
      })
      .end((err, res) => {
        expect(res.body.message).equal('Recipe removed from favorites');
        expect(res.status).equal(200);
        done();
      });
  });

  it('returns a message if user have no favorite recipe', (done) => {
    chai.request(app)
      .get('/api/v1/users/1/recipes')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.message).equal('You have no favorite recipes');
        done();
      });
  });
  it('returns error for invalid request paramater', (done) => {
    chai.request(app)
      .post('/api/v1/users/goat/recipes')
      .set('x-access-token', token)
      .send({
        recipeId: 2
      })
      .end((err, res) => {
        expect(res.body.message).equal('Parameter should be a number');
        expect(res.status).equal(400);
        done();
      });
  });
  it('returns error for unauthenticated user', (done) => {
    chai.request(app)
      .get('/api/v1/users/5/recipes')
      .set('x-access-token', token)
      .send({
        recipeId: 2
      })
      .end((err, res) => {
        expect(res.body.message).equal('Permission denied ');
        expect(res.status).equal(403);
        done();
      });
  });
  it('throws error for  favoriting recipe without token', (done) => {
    chai.request(app)
      .post('/api/v1/users/1/recipes')
      .end((err, res) => {
        expect(res.status).equal(403);
        expect(res.body.message).equal('You are not authorized');
        done();
      });
  });
  it('throws error for getting favoriting recipe without token', (done) => {
    chai.request(app)
      .get('/api/v1/users/1/recipes')
      .end((err, res) => {
        expect(res.status).equal(403);
        expect(res.body.message).equal('You are not authorized');
        done();
      });
  });
});
