import recipeController from '../controllers/recipeController';
import reviewController from '../controllers/reviewController';

export default (app) => {
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to More-Recipes app',
  }));

  app.post('/api/v1/recipes', recipeController.addRecipe);
  app.put('/api/v1/recipes/:Id', recipeController.editRecipe);
  app.delete('/api/v1/recipes/:recipeId', recipeController.deleteRecipe);
  app.get('/api/v1/recipes', recipeController.getRecipes);
  app.post('/api/v1/recipes/:recipeId/reviews', reviewController.addReview);
};
