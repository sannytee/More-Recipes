import { votes, Recipes } from '../models';
/**
 * @class upvotes
 */
export default class vote {
  /**
   * Checks if user already votes for a recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static checkVotes(req, res) {
    const { action } = req.query;
    const msg = action.replace('s', 'd');
    votes
      .find({
        where: {
          userId: req.decoded.id,
          recipeId: req.params.recipeId,
        }
      })
      .then((found) => {
        if (found === null) {
          return vote.createVotes(req, res);
        }

        if (found[`${action}`] === true) {
          return res.status(400).send({
            message: `You have already ${msg} this recipe`
          });
        }

        switch (action) {
          case 'upvotes':
            if (found.downvotes === true && found.upvotes === false) {
              return vote.alreadyVoted(req, res);
            }
            break;
          case 'downvotes':
            if (found.upvotes === true && found.downvotes === false) {
              return vote.alreadyVoted(req, res);
            }
            break;
          default:
            return null;
        }
      })
      .catch(err => res.status(400).send(err));
  }

  /**
   * Create votes for user
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static createVotes(req, res) {
    const { action } = req.query;
    const msg = action.replace('s', 'd');
    votes
      .create({
        userId: req.decoded.id,
        recipeId: req.params.recipeId,
        upvotes: true
      })
      .then(() => {
        vote.findRecipeToVote(req, res);
        return res.status(201).send({
          message: `Recipe successfully ${msg}`
        });
      })
      .catch(err => res.status(400).send(err));
  }

  /**
   * Finds the recipe to vote
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static findRecipeToVote(req, res) {
    Recipes
      .find({
        where: {
          id: req.params.recipeId
        },
      })
      .then((foundRecipe) => {
        vote.updateRecipeVotes(req, res, foundRecipe);
      })
      .catch(err => res.status(400).send(err));
  }

  /**
   * update upvotes/downvotes for recipe
   * @param {object} req
   * @param {object} res
   * @param {object} recipe
   * @returns  {JSON} Returns success or failure message
   */
  static updateRecipeVotes(req, res, recipe) {
    const { action } = req.query;
    switch (action) {
      case 'upvotes':
        return Recipes
          .update({
            upvotes: recipe[`${action}`] + 1,
          }, {
            where: {
              id: recipe.id,
            }
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      case 'downvotes':
        return Recipes
          .update({
            downvotes: recipe[`${action}`] + 1,
          }, {
            where: {
              id: recipe.id,
            }
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      default:
        return null;
    }
  }

  /**
   * Update recipe if already voted
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static alreadyVoted(req, res) {
    const { action } = req.query;
    const msg = action.replace('s', 'd');
    Recipes
      .find({
        where: {
          id: req.params.recipeId
        },
      })
      .then((foundRecipe) => {
        vote.updateVotes(req, res, foundRecipe);
        return res.status(200).send({
          message: `You have successfully ${msg} this recipe`
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
    const { action } = req.query;
    if (action === 'upvotes') {
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
          vote.update(req, res, foundRecipe);
        })
        .catch(err => res.status(400).send(err));
    }
    if (action === 'downvotes') {
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
          vote.update(req, res, foundRecipe);
        })
        .catch(err => res.status(400).send(err));
    }
  }

  /**
   * update  votes for Recipe if upvoted or downvoted
   * @param {object} req
   * @param {object} res
   * @param {object} recipe
   * @returns  {JSON} Returns success or failure message
   */
  static update(req, res, recipe) {
    const { action } = req.query;
    if (action === 'upvotes') {
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
    if (action === 'downvotes') {
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
  }
}
