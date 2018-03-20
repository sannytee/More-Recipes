import { expect } from 'chai';
import models from '../../models';

const { reviews, Recipes } = models;

describe('Review model', () => {
  before((done) => {
    Recipes
      .create({
        recipeName: 'eba',
        image: '##########',
        mealType: 'breakfast',
        description: 'amazing',
        method: 'great',
        ingredients: '##########',
        upvotes: 0,
        userId: 1,
        downvotes: 1,
        addedBy: 'sannytee',
      });
    done();
  });
  after((done) => {
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
    done();
  });
  it('throws error if review is not provided', (done) => {
    reviews
      .create({
        review: '',
        username: 'mei',
        recipeId: 1,
        userId: 10,
      })
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Review cannot be empty');
        done();
      });
  });
  it('creates a review with valid details', (done) => {
    reviews
      .create({
        review: 'awesome stuff',
        username: 'mei',
        recipeId: 1,
        userId: 1,
      })
      .then((review) => {
        expect(review.dataValues).to.be.an('object');
        expect(review.dataValues.review).to.equal('awesome stuff');
        done();
      });
  });
});
