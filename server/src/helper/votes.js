import { votes, Recipes } from '../models';
import { findRecipe } from '../middlewares/validation';

/**
 * @class votes
 */
export default class vote {
  /**
   * Checks if user already votes for a recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static checkVotes(req, res) {
    const message = 'Recipe unvoted';
    const { action } = req.query;
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
          if (action === 'upvotes') {
            Recipes
              .find({
                where: {
                  id: req.params.recipeId,
                }
              })
              .then((recipes) => {
                recipes.decrement('upvotes')
                  .then(() => {
                    recipes.reload();
                    found.update({
                      upvotes: false,
                    });
                    findRecipe(req, res, message);
                  });
              })
              .catch(err => res.status.send(err));
          } else {
            return Recipes
              .find({
                where: {
                  id: req.params.recipeId,
                }
              })
              .then((recipes) => {
                recipes.decrement('downvotes')
                  .then(() => {
                    recipes.reload();
                    found.update({
                      downvotes: false,
                    });
                    findRecipe(req, res, message);
                  });
              })
              .catch(err => res.status.send(err));
          }
        }

        switch (action) {
          case 'upvotes':
            if (found.downvotes === true && found.upvotes === false) {
              return vote.alreadyVoted(req, res);
            }
            if (found.downvotes === false && found.upvotes === false) {
              vote.afterUnvote(req, res);
            }
            break;
          case 'downvotes':
            if (found.upvotes === true && found.downvotes === false) {
              return vote.alreadyVoted(req, res);
            }
            if (found.downvotes === false && found.upvotes === false) {
              return vote.afterUnvote(req, res);
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
    if (action === 'upvotes') {
      votes
        .create({
          userId: req.decoded.id,
          recipeId: req.params.recipeId,
          upvotes: true
        })
        .then(() => {
          vote.findRecipeToVote(req, res);
        })
        .catch(err => res.status(500).send(err));
    } else {
      votes
        .create({
          userId: req.decoded.id,
          recipeId: req.params.recipeId,
          downvotes: true
        })
        .then(() => {
          vote.findRecipeToVote(req, res);
        })
        .catch(err => res.status(500).send(err));
    }
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
    const msg = action.replace('s', 'd');
    const resMessage = `Recipe successfully ${msg}`;
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
          .then(() => {
            findRecipe(req, res, resMessage);
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
          .then(() => {
            findRecipe(req, res, resMessage);
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
    Recipes
      .find({
        where: {
          id: req.params.recipeId
        },
      })
      .then((foundRecipe) => {
        vote.updateVotes(req, res, foundRecipe);
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
    const msg = action.replace('s', 'd');
    const resMessage = `Recipe successfully ${msg}`;
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
        .then(() => {
          findRecipe(req, res, resMessage);
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
        .then(() => {
          findRecipe(req, res, resMessage);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  }

  /**
   * update  votes after a user already unvote a recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static afterUnvote(req, res) {
    const { action } = req.query;
    const msg = action.replace('s', 'd');
    const message = `Recipe successfully ${msg}`;
    Recipes
      .find({
        where: {
          id: req.params.recipeId
        }
      })
      .then((recipes) => {
        switch (action) {
          case 'upvotes':
            recipes.update({
              upvotes: recipes.upvotes + 1,
            });
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
                findRecipe(req, res, message);
              })
              .catch(err => res.status(400).send(err));
            break;
          case 'downvotes':
            recipes.update({
              downvotes: recipes.downvotes + 1,
            });
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
                findRecipe(req, res, message);
              })
              .catch(err => res.status(400).send(err));

            break;
          default:
            return null;
        }
      })
      .catch(err => res.status(400).send(err));
  }
}
