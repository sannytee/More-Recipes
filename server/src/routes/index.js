import recipeController from '../controllers/recipeController';
import authentication from '../middlewares/authenticate';
import userController from '../controllers/userController';
import reviewController from '../controllers/reviewController';
import favoriteController from '../controllers/favoriteController';
import voteController from '../controllers/voteController';
import { checkBeforeCreatingRecipe, checkReqParams } from '../middlewares/validation';

export default (app) => {
  app.post(
    '/api/v1/users/signup',
    userController.signup
  );

  app.post(
    '/api/v1/users/signin',
    userController.signIn
  );

  app.get(
    '/api/v1/recipes',
    recipeController.get
  );

  app.get(
    '/api/v1/recipes/:recipeId',
    checkReqParams,
    authentication.verifyUser,
    recipeController.getOne
  );

  app.post(
    '/api/v1/recipes',
    authentication.verifyUser,
    checkBeforeCreatingRecipe,
    recipeController.addRecipe
  );

  app.put(
    '/api/v1/recipes/:recipeId',
    checkReqParams,
    authentication.verifyUser,
    recipeController.updateRecipe
  );

  app.delete(
    '/api/v1/recipes/:recipeId',
    checkReqParams,
    authentication.verifyUser,
    recipeController.delete
  );

  app.post(
    '/api/v1/recipes/:recipeId/reviews',
    checkReqParams,
    authentication.verifyUser,
    reviewController.add
  );

  app.post(
    '/api/v1/users/:userId/recipes',
    checkReqParams,
    authentication.verifyUser,
    favoriteController.add
  );

  app.get(
    '/api/v1/users/:userId/recipes',
    checkReqParams, authentication.verifyUser,
    favoriteController.get
  );

  app.get(
    '/api/v1/users/:userId/recipes/ids',
    checkReqParams, authentication.verifyUser,
    favoriteController.getIds
  );

  app.post(
    '/api/v1/recipes/:recipeId/votes',
    checkReqParams,
    authentication.verifyUser,
    voteController.vote
  );

  app.get(
    '/api/v1/users/:userId/myrecipes',
    checkReqParams,
    authentication.verifyUser,
    userController.myRecipes
  );
};
