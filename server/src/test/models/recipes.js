import { expect } from 'chai';
import models from '../../models';

const { Recipes } = models;

describe('Recipes model', () => {
  after((done) => {
    Recipes.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });
    done();
  });
  it('throws error if recipe name is not provided', (done) => {
    Recipes
      .create({
        recipeName: '',
        image: '##############',
        mealType: 'breakfast',
        description: 'amazing',
        method: 'great',
        ingredients: 'awesome',
        upvotes: 0,

        userId: 1,
        downvotes: 1,
        addedBy: 'sannytee',
      })
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Recipe name is required');
        done();
      });
  });
  it('throws error if image is not provided', (done) => {
    Recipes
      .create({
        recipeName: 'eba',
        image: '',
        mealType: 'breakfast',
        description: 'amazing',
        method: 'great',
        ingredients: 'awesome',
        upvotes: 0,

        userId: 1,
        downvotes: 1,
        addedBy: 'sannytee',
      })
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Upload an image');
        done();
      });
  });
  it('throws error if mealType is not provided', (done) => {
    Recipes
      .create({
        recipeName: 'eba',
        image: '##########',
        mealType: '',
        description: 'amazing',
        method: 'great',
        ingredients: 'awesome',
        upvotes: 0,
        userId: 1,
        downvotes: 1,
        addedBy: 'sannytee',
      })
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Meal type is required');
        done();
      });
  });
  it('throws error if description is not provided', (done) => {
    Recipes
      .create({
        recipeName: 'eba',
        image: '##########',
        mealType: 'breakfast',
        description: '',
        method: 'great',
        ingredients: 'awesome',
        upvotes: 0,
        userId: 1,
        downvotes: 1,
        addedBy: 'sannytee',
      })
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Please enter a description');
        done();
      });
  });
  it('throws error if method is not provided', (done) => {
    Recipes
      .create({
        recipeName: 'eba',
        image: '##########',
        mealType: 'breakfast',
        description: 'amazing',
        method: '',
        ingredients: 'awesome',
        upvotes: 0,
        userId: 1,
        downvotes: 1,
        addedBy: 'sannytee',
      })
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Please enter the method of cooking');
        done();
      });
  });
  it('throws error if ingredients is not provided', (done) => {
    Recipes
      .create({
        recipeName: 'eba',
        image: '##########',
        mealType: 'breakfast',
        description: 'amazing',
        method: 'great',
        ingredients: '',
        upvotes: 0,
        userId: 1,
        downvotes: 1,
        addedBy: 'sannytee',
      })
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Enter the required ingredients');
        done();
      });
  });
  it('creates a recipe with valid details', (done) => {
    Recipes
      .create({
        recipeName: 'eba',
        image: '##########',
        mealType: 'breakfast',
        description: 'amazing',
        method: 'great',
        ingredients: 'awesome',
        upvotes: 0,
        userId: 1,
        downvotes: 1,
        addedBy: 'sannytee',
      })
      .then((recipe) => {
        expect(recipe.dataValues.recipeName).to.be.a('string');
        expect(recipe.dataValues.description).to.be.a('string');
        expect(recipe.dataValues.image).to.be.a('string');
        expect(recipe.dataValues.mealType).to.be.a('string');
        expect(recipe.dataValues.ingredients).to.be.a('string');
        expect(recipe.dataValues.method).to.be.a('string');
        expect(recipe.dataValues).to.be.an('object');
        done();
      });
  });

  it('can update a recipe', (done) => {
    Recipes.findById(1)
      .then((recipe) => {
        recipe
          .update({
            recipeName: 'Updated'
          })
          .then((updatedRecipe) => {
            expect(updatedRecipe.dataValues.recipeName).to.equal('Updated');
            expect(updatedRecipe.dataValues).to.be.an('object');
            done();
          });
      });
  });

  it('can get all recipes', (done) => {
    Recipes
      .all()
      .then((recipes) => {
        expect(recipes).to.be.an('array');
        done();
      });
  });

  it('can get delete a recipe', (done) => {
    Recipes.findById(1)
      .then((recipe) => {
        recipe
          .destroy()
          .then((deletedRecipe) => {
            expect(deletedRecipe.length).to.equal(0);
            done();
          });
      });
  });
});
