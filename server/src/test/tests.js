import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import { Users, Recipes, reviews, favorites } from '../models';

const { expect } = chai;

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
let token2;

describe('More-Recipe Tests:', () => {
  describe('Test for User', () => {
    it('Throw error for username less than six', (done) => {
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
    it('Throw error if password does not match', (done) => {
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
    it('POST /api/v1/users/signup does create new user', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send({
          username: 'example',
          email: 'example@gmail.com',
          password: 'example97',
          confirmPassword: 'example97'
        })
        .end((err, res) => {
          expect(res.body.success).equal(true);
          expect(res.status).equal(201);
          expect(res.body.message).equal('Account created');
          expect(res.body.username).equal('example');
          done();
        });
    });
    it('POST /api/v1/users/signup does create new user', (done) => {
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
    it('POST /api/v1/users/signin does allow user to signin with username', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({
          username: 'example',
          password: 'exampl'
        })
        .end((err, res) => {
          expect(res.status).equal(400);
          expect(res.body.error).equal('Incorrect Login details');
          done();
        });
    });
    it('POST /api/v1/users/signin does allow user to signin with username', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({
          username: 'example20@gmail.com',
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
          username: 'example@gmail.com',
          password: 'example97'
        })
        .end((err, res) => {
          expect(res.body.success).equal(true);
          expect(res.status).equal(200);
          token2 = res.body.token;
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
    it('returns 400 error when email is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send({
          username: 'boruto',
          email: 'ecample.com',
          password: 'naruto',
          confirmPassword: 'naruto'
        })
        .end((err, res) => {
          expect(res.status).equal(400);
          expect(res.body.error).equal('This email is invalid');
          done();
        });
    });
    it('returns 400 error if user already exist', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send({
          username: 'example',
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
    it('returns 400 error if email already exist', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send({
          username: 'boruto',
          email: 'example@gmail.com',
          password: 'naruto',
          confirmPassword: 'naruto'
        })
        .end((err, res) => {
          expect(res.status).equal(400);
          expect(res.body.error).equal('This email already exists');
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
          method: 'fry the yam for five minutes',
          image: 'hjjfjfkdkdldld'
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
          method: 'fry the yam for five minutes',
          image: 'hjjfjfkdkdldld'
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
          recipeName: 'Beef soup',
          mealType: 'breakfast',
          ingredients: 'water, beans,hfj',
          description: 'Buy the meat from market',
          method: 'fry the yam for five minutes',
          image: 'hjjfjfkdkdldld'
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
    it('PUT /api/v1/recipes/recipeId throws error if users try to update recipe not added by them', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .set('x-access-token', token2)
        .type('form')
        .send({
          recipeName: 'Meat',
        })
        .end((err, res) => {
          expect(res.status).equal(403);
          expect(res.body.message).equal('You are not allowed to perform this action');
          done();
        });
    });
    it('PUT /api/v1/recipes/recipeId returns error if recipe does not exist', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/4')
        .set('x-access-token', token)
        .type('form')
        .send({
          recipeName: 'Meat',
        })
        .end((err, res) => {
          expect(res.status).equal(404);
          expect(res.body.message).equal('Recipe not found');
          done();
        });
    });
    it('DELETE /api/v1/recipes/recipeId throws error if users try to delete recipe not added by them', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/1')
        .set('x-access-token', token2)
        .type('form')
        .end((err, res) => {
          expect(res.status).equal(403);
          expect(res.body.message).equal('You are not allowed to perform this action');
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
    it('DELETE /api/v1/recipes/recipeId returns error if recipe does not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/4')
        .set('x-access-token', token)
        .type('form')
        .end((err, res) => {
          expect(res.status).equal(404);
          expect(res.body.message).equal('Recipe not found');
          done();
        });
    });
    it('GET /api/v1/recipes does get all recipe', (done) => {
      chai.request(app)
        .get('/api/v1/recipes?page=0')
        .end((err, res) => {
          expect(res.status).equal(200);
          expect(res.body.allRecipes).to.be.an('array');

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
    it('Throw error if a particular recipe does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/10')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).equal(404);
          expect(res.body.message).equal('Recipe not found');
          done();
        });
    });
    it('returns error for empty recipeName', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', token)
        .type('form')
        .send({
          recipeName: '',
          mealType: 'breakfast',
          ingredients: 'water, beans,hfj',
          description: 'Buy the meat from market',
          method: 'fry the yam for five minutes'
        })
        .end((err, res) => {
          expect(res.status).equal(400);
          expect(res.body.error).equal('name of recipe required');
          done();
        });
    });
    it('returns error for empty mealType', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', token)
        .type('form')
        .send({
          recipeName: 'goat and meat',
          mealType: '',
          ingredients: 'water, beans,hfj',
          description: 'Buy the meat from market',
          method: 'fry the yam for five minutes'
        })
        .end((err, res) => {
          expect(res.status).equal(400);
          expect(res.body.error).equal('mealtype required');
          done();
        });
    });
    it('returns error for empty ingredients', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', token)
        .type('form')
        .send({
          recipeName: 'goat and meat',
          mealType: 'breakfast',
          ingredients: '',
          description: 'Buy the meat from market',
          method: 'fry the yam for five minutes'
        })
        .end((err, res) => {
          expect(res.status).equal(400);
          expect(res.body.error).equal('Input ingredients required');
          done();
        });
    });
    it('returns error for empty ingredients', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', token)
        .type('form')
        .send({
          recipeName: 'goat and meat',
          mealType: 'breakfast',
          ingredients: 'fish,meat,onions',
          description: '',
          method: 'fry the yam for five minutes'
        })
        .end((err, res) => {
          expect(res.status).equal(400);
          expect(res.body.error).equal('description required');
          done();
        });
    });
    it('returns error for empty method', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', token)
        .type('form')
        .send({
          recipeName: 'goat and meat',
          mealType: 'breakfast',
          ingredients: 'fish,meat,onions',
          description: 'A quick food to brighten up',
          method: ''
        })
        .end((err, res) => {
          expect(res.status).equal(400);
          expect(res.body.error).equal('Method of cooking required');
          done();
        });
    });
  });
  describe('Test for reviews and favorite', () => {
    it('POST /api/v1/recipes/:recipeId/reviews does create review for a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/reviews')
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
        .post('/api/v1/recipes/1/reviews')
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
    it('returns error for recipe that does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/4/reviews')
        .set('x-access-token', token)
        .send({
          review: 'It is delicious'
        })
        .end((err, res) => {
          expect(res.body.message).equal('Recipe not found');
          expect(res.status).equal(404);
          done();
        });
    });
    it('POST /api/v1/users/:userId/recipes does create favorite recipe for user', (done) => {
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
    it('remove recipe from favorite if user try to add recipe still in favorite', (done) => {
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
    it('GET /api/v1/users/:userId/recipes does get all favorite recipe for user', (done) => {
      chai.request(app)
        .get('/api/v1/users/2/recipes')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).equal(200);
          console.log(res.body);
          expect(res.body.message).equal('You have no favorite recipes');
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
    it('returns error for invalid user Id for favoriting', (done) => {
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
    it('returns error when  params does not match userId', (done) => {
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
  });
  describe('Test for upvoting and downvoting Recipes', () => {
    it('throws error for if params is not available', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/votes')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.error).equal('Enter a query params');
          expect(res.status).equal(400);
          done();
        });
    });

    it('throws error for wrong paramater', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/votes?action=vjffh')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.error).equal('Invalid query params');
          expect(res.status).equal(400);
          done();
        });
    });

    it('upvotes recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/votes?action=upvotes')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.message).equal('Recipe successfully upvoted');
          expect(res.status).equal(200);
          done();
        });
    });
    it('unvotes recipe  for recipe already upvoted', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/votes?action=upvotes')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.message).equal('You have successfully unvoted this recipe');
          expect(res.status).equal(200);
          done();
        });
    });
    it('does not upvote recipe that does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/5/votes?action=upvotes')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.message).equal('Recipe not found');
          expect(res.status).equal(404);
          done();
        });
    });
    it('downvotes recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/3/votes?action=downvotes')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.message).equal('Recipe successfully downvoted');
          expect(res.status).equal(200);
          done();
        });
    });
    it('downvotes recipe already upvoted', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/votes?action=downvotes')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.message).equal('Recipe successfully downvoted');
          expect(res.status).equal(200);
          done();
        });
    });
    it('throws error for recipe already downvoted', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/votes?action=downvotes')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.message).equal('You have successfully unvoted this recipe');
          expect(res.status).equal(200);
          done();
        });
    });
    it('upvotes recipe already downvoted', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/votes?action=upvotes')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.message).equal('Recipe successfully upvoted');
          expect(res.status).equal(200);
          done();
        });
    });
    it('does not downvotes recipe that does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/5/votes?action=upvotes')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.message).equal('Recipe not found');
          expect(res.status).equal(404);
          done();
        });
    });
  });
  describe('Test for protected routes', () => {
    it('throws error for creating recipe without token', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .end((err, res) => {
          expect(res.status).equal(403);
          expect(res.body.message).equal('You are not authorized');
          done();
        });
    });
    it('throws error for updating recipe without token', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .end((err, res) => {
          expect(res.status).equal(403);
          expect(res.body.message).equal('You are not authorized');
          done();
        });
    });
    it('throws error for deleting recipe  without token', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/1')
        .end((err, res) => {
          expect(res.status).equal(403);
          expect(res.body.message).equal('You are not authorized');
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
    it('throws error for upvoting recipe without token', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/votes?action=upvotes')
        .end((err, res) => {
          expect(res.status).equal(403);
          expect(res.body.message).equal('You are not authorized');
          done();
        });
    });
    it('throws error for downvoting recipe without token', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/votes?action=upvotes')
        .end((err, res) => {
          expect(res.status).equal(403);
          expect(res.body.message).equal('You are not authorized');
          done();
        });
    });
  });
});
