import { votes, Recipes } from '../models';
/**
 * @class upvotes
 */
export default class upvotes {
  /**
   * update upvotes for recipe
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
   * upvotes  upvotes for Recipe if downvoted
   * @param {object} req
   * @param {object} res
   * @param {object} recipe
   * @returns  {JSON} Returns success or failure message
   */
  static update(req, res, recipe) {
    Recipes
      .update({
        downvotes: recipe.downvotes - 1,
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
   * Finds the recipe to upvote
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
      .then(() => {
        upvotes.findRecipeToUpvote(req, res);
        return res.status(201).send({
          message: 'Recipe successfully upvoted'
        });
      })
      .catch(err => res.status(400).send(err));
  }

  /**
   * Update  the votes table
   * @param {object} req
   * @param {object} res
   * @param {object} foundRecipe
   * @returns  {JSON} Returns success or failure message
   */
  static updateVotes(req, res, foundRecipe) {
    votes
      .update({
        upvotes: true,
        downvotes: false,
      }, {
        where: {
          userId: req.decoded.id,
          recipeId: req.params.recipeId
        }
      })
      .then(() => {
        upvotes.update(req, res, foundRecipe);
      })
      .catch(err => res.status(400).send(err));
  }

  /**
   * Update recipe if already downvoted
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static alreadyDownvoted(req, res) {
    Recipes
      .find({
        where: {
          id: req.params.recipeId
        },
      })
      .then((foundRecipe) => {
        upvotes.updateVotes(req, res, foundRecipe);
        return res.status(200).send({
          message: 'You have successfully upvoted this recipe'
        });
      })
      .catch(err => res.status(400).send(err));
  }

  /**
   * Checks if user already upvote for a recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static checkUpvotes(req, res) {
    votes
      .find({
        where: {
          userId: req.decoded.id,
          recipeId: req.params.recipeId,
        }
      })
      .then((found) => {
        if (found === null) {
          return upvotes.createUpvotes(req, res);
        }

        if (found.upvotes === true) {
          return res.status(400).send({
            message: 'You have already upvoted this recipe'
          });
        }

        if (found.downvotes === true && found.upvotes === false) {
          return upvotes.alreadyDownvoted(req, res);
        }
      })
      .catch(err => res.status(400).send(err));
  }
}
