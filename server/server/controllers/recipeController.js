import { Recipes } from '../models';
import recipeHelper from '../helper/recipe';

export default {
  /**
   * Create a new Recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  addRecipe(req, res) {
    recipeHelper.createRecipe(req, res, Recipes);
  },
  /**
   * Update a recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  updateRecipe(req, res) {
    recipeHelper.editRecipe(req, res, Recipes);
  },
  /**
   * call a method to delete recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  delete(req, res) {
    recipeHelper.deleteRecipe(req, res, Recipes);
  }
};
