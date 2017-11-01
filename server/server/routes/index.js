import recipeController from '../controllers/recipeController';
import authentication from '../middlewares/authenticate';
import userController from '../controllers/userController';

export default (app) => {
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to More-Recipes app',
  }));

  app.post('/api/v1/users/signup', userController.signup);
  app.post('/api/v1/users/signin', userController.signIn);
  app.post('/api/v1/recipes', authentication.verifyUser, recipeController.addRecipe);
};
