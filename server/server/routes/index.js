import recipeController from '../controllers/recipeController';
import authentication from '../middlewares/authenticate';
import userController from '../controllers/userController';
import reviewController from '../controllers/reviewController';
import favoriteController from '../controllers/favoriteController';

export default (app) => {
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to More-Recipes app',
  }));

  app.post('/api/v1/users/signup', userController.signup);
  app.post('/api/v1/users/signin', userController.signIn);
  app.post('/api/v1/recipes', authentication.verifyUser, recipeController.addRecipe);
  app.put('/api/v1/recipes/:recipeId', authentication.verifyUser, recipeController.updateRecipe);
  app.delete('/api/v1/recipes/:recipeId', authentication.verifyUser, recipeController.delete);
  app.get('/api/v1/recipes', authentication.verifyUser, recipeController.get);
  app.post('/api/v1/recipes/:recipeId/reviews', authentication.verifyUser, reviewController.add);
  app.post('/api/v1/users/:userId/recipes', authentication.verifyUser, favoriteController.add);
  app.get('/api/v1/users/:userId/recipes', authentication.verifyUser, favoriteController.get);
  app.post('/api/v1/users/:recipeId/upvotes', authentication.verifyUser, recipeController.upvote);
  app.post('/api/v1/users/:recipeId/downvotes', authentication.verifyUser, recipeController.downvote);
  app.get('/api/v1/recipes/:recipeId', authentication.verifyUser, recipeController.getOne);
};
