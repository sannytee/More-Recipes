import { votes, Recipes } from '../models';
/**
 * @class upvotes
 */
export default class upvotes {
  /**
   * upvotes  a  Recipe
   * @param {object} req
   * @param {object} res
   * @param {object} recipe
   * @returns  {JSON} Returns success or failure message
   */
  static updateUpvote(req, res, recipe) {
    Recipes
      .update({
        upvotes: recipe.upvotes + 1,
      }, {
        where: {
          id: recipe.id,
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }

  /**
   * Find the recipe to upvote
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static findRecipeToUpvote(req, res) {
    Recipes
      .find({
        where: {
          id: req.params.recipeId
        },
      })
      .then((foundRecipe) => {
        upvotes.updateUpvote(req, res, foundRecipe);
      })
      .catch(err => res.status(400).send(err));
  }

  /**
   * Create votes for user
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static createUpvotes(req, res) {
    votes
      .create({
        userId: req.decoded.id,
        recipeId: req.params.recipeId,
        upvotes: true
      })
      .then((voted) => {
        upvotes.findRecipeToUpvote(req, res);
        return res.status(201).send(voted);
      })
      .catch(err => res.status(400).send(err));
  }
}
