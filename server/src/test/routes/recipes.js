import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import { Recipes } from '../../models';

const { expect } = chai;

chai.use(chaiHttp);
let token;

const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJzYW5ueXRlZSIsImlhdCI6MTUyMTUxMjYwMywiZXhwIjoxNTIyODI3MDAzfQ.anRpTIMR3Q80-FL2w9Xb4QmAYuqSbaf7IwmT-sBYOX0';

describe('Recipes API route', () => {
  before((done) => {
    Recipes.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
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

  it('allows authenticated users to create   recipe', (done) => {
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
  it('allows users to update their recipe', (done) => {
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
  it('throws error if  unauthenticated users try to update recipe', (done) => {
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
  it('throws error if recipe does not exist', (done) => {
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

  it('throws error if  unauthenticated users try to delete recipe', (done) => {
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
  it('throws error if recipe does not exist', (done) => {
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
  it('allows user does get all recipe in paginated form', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?page=0')
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.allRecipes).to.be.an('array');

        done();
      });
  });
  it('allows user to does get a single recipe', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/1')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.id).equal(1);
        done();
      });
  });
  it('throws error if a particular recipe does not exist', (done) => {
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

  it('throws error for if params is not available for voting a recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/votes')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body.error).equal('Enter a query params');
        expect(res.status).equal(400);
        done();
      });
  });

  it('throws error if the paramater for voting is wrong', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/votes?action=vjffh')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body.error).equal('Invalid query params');
        expect(res.status).equal(400);
        done();
      });
  });

  it('allows authenticated user to upvote recipe with the right query', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/votes?action=upvotes')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body.message).equal('Recipe successfully upvoted');
        expect(res.status).equal(200);
        done();
      });
  });
  it('allows  authenticated user to unvote recipe already upvoted', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/votes?action=upvotes')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body.message).equal('Recipe unvoted');
        expect(res.status).equal(200);
        done();
      });
  });
  it('throws error to upvote recipe that does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/5/votes?action=upvotes')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body.message).equal('Recipe not found');
        expect(res.status).equal(404);
        done();
      });
  });
  // it('allows authenticated user to downvotes recipe', (done) => {
  //   chai.request(app)
  //     .post('/api/v1/recipes/3/votes?action=downvotes')
  //     .set('x-access-token', token)
  //     .end((err, res) => {
  //       expect(res.body.message).equal('Recipe successfully downvoted');
  //       expect(res.status).equal(200);
  //       done();
  //     });
  // });
  it('allows authenticated user to downvote recipe already upvoted', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/votes?action=downvotes')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body.message).equal('Recipe successfully downvoted');
        expect(res.status).equal(200);
        done();
      });
  });
  it('allows authenticated user to unvote recipe already downvoted', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/votes?action=downvotes')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body.message).equal('Recipe unvoted');
        expect(res.status).equal(200);
        done();
      });
  });
  it('allows authenticated user to upvote recipe already downvoted', (done) => {
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
  it('allows authenticated user to delete recipe', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/1')
      .set('x-access-token', token)
      .type('form')
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.message).equal('recipe successfully deleted');
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
  it('throws error to get user recipes without token', (done) => {
    chai.request(app)
      .get('/api/v1/users/1/myrecipes')
      .end((err, res) => {
        expect(res.status).equal(403);
        expect(res.body.message).equal('You are not authorized');
        done();
      });
  });
});
