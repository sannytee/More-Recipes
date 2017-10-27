import db from '../db';
import voteController from './voteController';

/**
 * @class recipeController
*/
export default class recipeController {
  /**
   * Create a new Recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  static addRecipe(req, res) {
    const {
      recipeName, mealType, description, userId,
    } = req.body;
    let { ingredients } = req.body;
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
    ingredients = ingredients.split(',');
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

    return res.status(201).send({
      success: true,
      data: db.recipes[id - 1],
      message: 'Recipe created'
    });
  }

  /**
   * modify a Recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  static editRecipe(req, res) {
    const id = req.params.Id;
    const {
      recipeName, mealType, description, ingredients
    } = req.body;

    db.recipes.forEach((recipe) => {
      if (recipe.id === parseInt(id, 10)) {
        recipe.recipeName = recipeName || recipe.recipeName;
        recipe.mealType = mealType || recipe.mealType;
        recipe.description = description || recipe.description;
        recipe.ingredients = ingredients.split(',') || recipe.ingredients;

        res.status(200).send({
          success: true,
          message: 'Recipe successfully updated',
          data: recipe
        });
      }
    });
    return res.status(404).send({
      message: 'Recipe Not found!'
    });
  }

  /**
   * delete  a Recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  static deleteRecipe(req, res) {
    const id = req.params.recipeId;
    db.recipes.forEach((recipe) => {
      if (recipe.id === parseInt(id, 10)) {
        db.recipes.splice(id, 1);
        res.status(200).send({
          message: 'Recipe has been Deleted'
        });
      }
    });
    return res.status(404).send({
      message: 'Recipe Not found!'
    });
  }
  /**
   * get  all Recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  static getRecipes(req, res) {
    if (req.query.sort === 'upvotes' && req.query.order === 'des') {
      voteController.getMostVotedRecipe(req, res);
    } else {
      res.status(200).send(db.recipes);
    }
  }
}
