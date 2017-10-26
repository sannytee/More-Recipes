import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';

const should = chai.should();
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
          res.body.success.should.equal(true);
          res.should.have.status(201);
          res.body.message.should.equal('Recipe created');
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
          res.body.success.should.equal(true);
          res.should.have.status(201);
          res.body.message.should.equal('Review Added');
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
          res.body.success.should.equal(true);
          res.status.should.equals(200);
          res.body.message.should.equal('Recipe successfully updated');
          done();
        });
    });
  });
  describe('Retrieving data', () => {
    it('GET /api/v1/recipes does get all recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/')
        .end((err, res) => {
          res.status.should.equals(200);
          res.body.should.be.a('array');
          res.body.length.should.equals(3);
          done();
        });
    });
  });
});
