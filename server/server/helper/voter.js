/**
 * @class votes
 */
export default class voter {
  /**
   * upvotes  a  Recipe
   * @param {object} req
   * @param {object} res
   * @param {object} model
   * @param {int} id
   * @param {object} recipe
   * @returns  {JSON} Returns success or failure message
   */
  static updateUpvote(req, res, model, id, recipe) {
    model
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
   * @param {object} Recipes
   * @param {int} id
   * @returns  {JSON} Returns success or failure message
   */
  static findRecipeToUpdate(req, res, Recipes, id) {
    Recipes
      .find({
        where: {
          id,
        },
      })
      .then((foundRecipe) => {
        voter.updateUpvote(req, res, Recipes, foundRecipe);
      })
      .catch(err => res.status(400).send(err));
  }

  /**
   * Find the recipe to downvote
   * @param {object} req
   * @param {object} res
   * @param {object} Recipes
   * @param {int} id
   * @param {object} voted
   * @returns  {JSON} Returns success or failure message
   */
  static findRecipeToDownvote(req, res, Recipes, id, voted) {
    if (voted.upvotes === true && voted.downvotes === false) {
      Recipes
        .find({
          where: {
            id,
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
          id,
        },
      })
      .then((foundRecipe) => {
        voter.update(req, res, Recipes, foundRecipe);
      })
      .catch(err => res.status(400).send(err));
  }
}
