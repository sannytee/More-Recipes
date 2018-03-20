import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import { Recipes, reviews } from '../../models';

const {
  expect
} = chai;

chai.use(chaiHttp);
let token;


describe('Review API route', () => {
  before((done) => {
    reviews.destroy({
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
  it('allows authenticated user to post review for a recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/2/reviews')
      .set('x-access-token', token)
      .send({
        review: 'This is so do spicy'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Review posted');
        expect(res.status).equal(201);
        expect(res.body.review).to.be.an('object');
        done();
      });
  });
  it('returns error for empty review', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/2/reviews')
      .set('x-access-token', token)
      .send({
        review: ''
      })
      .end((err, res) => {
        expect(res.body.message).equal('Review cannot be empty');
        expect(res.status).equal(400);
        done();
      });
  });
  it('returns error for invalid recipe Id for review', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/goat/reviews')
      .set('x-access-token', token)
      .send({
        review: 'It is delicious'
      })
      .end((err, res) => {
        expect(res.body.message).equal('Parameter should be a number');
        expect(res.status).equal(400);
        done();
      });
  });

  it('throws error for posting reviews for  recipe without token', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/reviews')
      .end((err, res) => {
        expect(res.status).equal(403);
        expect(res.body.message).equal('You are not authorized');
        done();
      });
  });
});
