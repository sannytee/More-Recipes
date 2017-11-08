import { votes, Recipes } from '../models';
/**
 * @class votes
 */
export default class voter {
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
   * downvotes  a  Recipe
   * @param {object} req
   * @param {object} res
   * @param {object} model
   * @param {int} id
   * @param {object} recipe
   * @returns  {JSON} Returns success or failure message
   */
  static updateDownvote(req, res, model, id, recipe) {
    model
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
   * @param {object} model
   * @param {int} id
   * @param {object} recipe
   * @returns  {JSON} Returns success or failure message
   */
  static update(req, res, model, id, recipe) {
    model
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
        voter.updateUpvote(req, res, foundRecipe);
      })
      .catch(err => res.status(400).send(err));
  }

  /**
   * Find the recipe to downvote
   * @param {object} req
   * @param {object} res
   * @param {object} voted
   * @returns  {JSON} Returns success or failure message
   */
  static findRecipeToDownvote(req, res, voted) {
    if (voted.upvotes === true && voted.downvotes === false) {
      Recipes
        .find({
          where: {
            id: req.params.recipeId
          },
        })
        .then((foundRecipe) => {
          voter.update(req, res, Recipes, foundRecipe);
        })
        .catch(err => res.status(400).send(err));
    }
    Recipes
      .find({
        where: {
          id: req.params.recipeId
        },
      })
      .then((foundRecipe) => {
        voter.update(req, res, Recipes, foundRecipe);
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
        console.log(voted);
        votes.findRecipeToUpvote(req, res, Recipes);
        return res.status(201).send(voted);
      })
      .catch(err => res.status(400).send(err));
  }
}
