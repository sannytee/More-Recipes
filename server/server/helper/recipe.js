/**
 * @class recipe
 */
export default class recipe {
  /**
   * Create a new Recipe
   * @param {object} req
   * @param {object} res
   * @param {object} model
   * @returns  {JSON} Returns success or failure message
   */
  static createRecipe(req, res, model) {
    model
      .create({
        userId: req.decoded.id,
        recipeName: req.body.recipeName,
        mealType: req.body.mealType,
        description: req.body.description,
        method: req.body.method,
        ingredients: req.body.ingredients,

      })
      .then(recipes => res.status(201).send({
        success: true,
        data: recipes,
        message: 'Recipe successfully added'
      }))
      .catch(err => res.status(400).send(err));
  }
  /**
   * Update a  Recipe
   * @param {object} req
   * @param {object} res
   * @param {object} model
   * @returns  {JSON} Returns success or failure message
   */
  static editRecipe(req, res, model) {
    model
      .find({
        where: {
          userId: req.decoded.id,
          id: req.params.recipeId
        }
      })
      .then((recipes) => {
        if (!recipes) {
          return res.status(404).send({
            message: 'Recipe not found'
          });
        }
        return recipes
          .update({
            recipeName: req.body.recipeName || recipes.recipeName,
            mealType: req.body.mealType || recipes.mealType,
            description: req.body.description || recipes.description,
            method: req.body.method || recipes.method,
            ingredients: req.body.ingredients || recipes.ingredients,
          })
          .then(updatedRecipes => res.status(200).send({
            data: updatedRecipes,
            message: 'Recipe successfully updated'
          }));
      })
      .catch(err => res.status(400).send(err));
  }
}
