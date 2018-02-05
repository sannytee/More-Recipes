import { reviews } from '../models';
import recipeHelper from '../helper/recipe';

export default {
  /**
   * Create a new Recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  addRecipe(req, res) {
    recipeHelper.createRecipe(req, res);
  },
  /**
   * Update a recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  updateRecipe(req, res) {
    recipeHelper.editRecipe(req, res);
  },
  /**
   * call a method to delete recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  delete(req, res) {
    recipeHelper.deleteRecipe(req, res);
  },
  /**
   * call a method to get all recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  get(req, res) {
    recipeHelper.getRecipe(req, res, reviews);
  },
  /**
   * call a method to get  a recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  getOne(req, res) {
    recipeHelper.getARecipe(req, res, reviews);
  },

};
