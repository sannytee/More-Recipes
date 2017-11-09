import { Recipes, votes } from '../models';

/**
 * @class downvotes
 */
export default class downvotes {
  /**
   * downvotes  a  Recipe
   * @param {object} req
   * @param {object} res
   * @param {object} recipe
   * @returns  {JSON} Returns success or failure message
   */
  static updateDownvote(req, res, recipe) {
    Recipes
      .update({
        downvotes: recipe.downvotes + 1,
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
   * downvotes  a  Recipe
   * @param {object} req
   * @param {object} res
   * @param {object} recipe
   * @returns  {JSON} Returns success or failure message
   */
  static update(req, res, recipe) {
    Recipes
      .update({
        downvotes: recipe.downvotes + 1,
        upvotes: recipe.upvotes - 1,
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
   * Find the recipe to downvote
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static findRecipeToDownvote(req, res) {
    Recipes
      .find({
        where: {
          id: req.params.recipeId
        },
      })
      .then((foundRecipe) => {
        downvotes.updateDownvote(req, res, foundRecipe);
      })
      .catch(err => res.status(400).send(err));
  }
  /**
   * Find the recipe to downvote
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static alreadyUpvoted(req, res) {
    Recipes
      .find({
        where: {
          id: req.params.recipeId
        },
      })
      .then((foundRecipe) => {
        downvotes.update(req, res, Recipes, foundRecipe);
      })
      .catch(err => res.status(400).send(err));
  }

  /**
   * Create votes for user
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static createDownvotes(req, res) {
    votes
      .create({
        userId: req.decoded.id,
        recipeId: req.params.recipeId,
        downvotes: true
      })
      .then((voted) => {
        downvotes.findRecipeToDownvote(req, res);
        return res.status(201).send(voted);
      })
      .catch(err => res.status(400).send(err));
  }
}
