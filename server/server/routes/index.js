import recipeController from '../controllers/recipeController';
import authentication from '../middlewares/authenticate';
import userController from '../controllers/userController';
import reviewController from '../controllers/reviewController';
import favoriteController from '../controllers/favoriteController';
import voteController from '../controllers/votes';

export default (app) => {
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to More-Recipes app',
  }));

  app.post('/api/v1/users/signup', userController.signup);
  app.post('/api/v1/users/signin', userController.signIn);
  app.get('/api/v1/recipes', recipeController.get);
  app.get('/api/v1/recipes/:recipeId', recipeController.getOne);
  app.use(authentication.verifyUser);
  app.post('/api/v1/recipes', recipeController.addRecipe);
  app.put('/api/v1/recipes/:recipeId', recipeController.updateRecipe);
  app.delete('/api/v1/recipes/:recipeId', recipeController.delete);
  app.post('/api/v1/recipes/:recipeId/reviews', reviewController.add);
  app.post('/api/v1/users/:userId/recipes', favoriteController.add);
  app.get('/api/v1/users/:userId/recipes', favoriteController.get);
  app.post('/api/v1/users/:recipeId/upvotes', voteController.upvote);
  app.post('/api/v1/users/:recipeId/downvotes', recipeController.downvote);
};
