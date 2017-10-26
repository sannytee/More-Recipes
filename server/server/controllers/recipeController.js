import db from '../db';

/**
 * @class recipeController
*/
export default class recipeController {
  /**
   * Create a new User
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  static addRecipe(req, res) {
    const {
      recipeName, mealType, description, userId
    } = req.body;
    const ingredients = req.body.ingredients.split(',');
    if (!recipeName) {
      return res.status(400).send({
        message: 'Please Enter Recipe Name'
      });
    }
    if (!mealType) {
      return res.status(400).send({
        message: 'Please Enter the mealType'
      });
    }
    if (!description) {
      return res.status(400).send({
        message: 'Please Enter the description to make recipe'
      });
    }
    if (!ingredients) {
      return res.status(400).send({
        message: 'Please Enter  Ingridents required'
      });
    }
    const { length } = db.recipes;
    const id = length + 1;

    db.recipes.push({
      id,
      userId,
      recipeName,
      mealType,
      description,
      ingredients,
      upvotes: 0,
      downvotes: 0
    });

    return res.status(201).send(db.recipes[id - 1]);
  }
}
