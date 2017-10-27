import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';

const expect = chai.expect;
chai.use(chaiHttp);

describe('More-Recipe Tests:', () => {
  describe('Creating and updating data ', () => {
    it('POST /api/v1/recipes does create new recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/')
        .send({
          userId: 5,
          recipeName: 'Rice',
          mealType: 'lunch',
          description: 'Boil water for five minutes',
          ingredients: 'water, goat, rice, blah,',
        })
        .end((err, res) => {
          expect(res.body.success).equal(true);
          expect(res.status).equal(201);
          expect(res.body.message).equal('Recipe created');
          done();
        });
    });
    it('POST /api/v1/recipes/:recipeId/reviews does allow user to post review', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/4/reviews')
        .send({
          userId: 5,
          review: "It's so delicious"
        })
        .end((err, res) => {
          expect(res.body.success).equal(true);
          expect(res.status).equal(201);
          expect(res.body.message).equal('Review Added');
          done();
        });
    });
    it('POST /api/v1/recipes/:recipeId does allow user to edit a recipe', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/3')
        .send({
          recipeName: 'Beans',
          mealType: 'Dinner',
          ingredients: 'beans, rice goat'
        })
        .end((err, res) => {
          expect(res.body.success).equal(true);
          expect(res.status).equal(200);
          expect(res.body.message).equal('Recipe successfully updated');
          done();
        });
    });
  });
  describe('Retrieving data', () => {
    it('GET /api/v1/recipes does get all recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/')
        .end((err, res) => {
          expect(res.status).equals(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).equals(3);
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
