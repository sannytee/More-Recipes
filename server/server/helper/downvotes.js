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
   * Update  votes
   * @param {object} req
   * @param {object} res
   * @param {object} foundRecipe
   * @returns  {JSON} Returns success or failure message
   */
  static updateVote(req, res, foundRecipe) {
    votes
      .update({
        upvotes: false,
        downvotes: true,
      }, {
        where: {
          userId: req.decoded.id,
          recipeId: req.params.recipeId
        }
      })
      .then(() => {
        downvotes.update(req, res, foundRecipe);
      })
      .catch(err => res.status(400).send(err));
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
   * Update recipe
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
        downvotes.updateVote(req, res, foundRecipe);
        return res.status(200).send({
          message: 'You have successfully downvoted this recipe'
        });
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
      .then(() => {
        downvotes.findRecipeToDownvote(req, res);
        return res.status(201).send({
          message: 'Recipe successfully downvoted'
        });
      })
      .catch(err => res.status(400).send(err));
  }
  /**
   * Checks if user already downvote for a recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static checkDownvotes(req, res) {
    votes
      .find({
        where: {
          userId: req.decoded.id,
          recipeId: req.params.recipeId,
        }
      })
      .then((found) => {
        if (found === null) {
          return downvotes.createDownvotes(req, res);
        }
        if (found.downvotes === true) {
          return res.status(400).send({
            message: 'You have already downvoted this recipe'
          });
        }
        if (found.upvotes === true && found.downvotes === false) {
          return downvotes.alreadyUpvoted(req, res);
        }
      })
      .catch(err => res.status(400).send(err));
  }
}
