import { Recipes } from '../models';
import { recipeNotFound, validateUser } from '../middlewares/validation';

/**
 * @class recipe
 */
export default class recipe {
  /**
   * Create a new Recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static createRecipe(req, res) {
    const {
      recipeName,
      mealType,
      description,
      method,
      ingredients,
      image,
    } = req.body;
    Recipes
      .create({
        userId: req.decoded.id,
        addedBy: req.decoded.username,
        recipeName,
        mealType,
        description,
        method,
        ingredients,
        image
      })
      .then(recipes => res.status(201).send({
        success: true,
        Recipe: recipes,
        message: 'Recipe successfully added'
      }))
      .catch((err) => {
        const errors = [];
        if (err.name === 'SequelizeValidationError') {
          /* eslint-disable array-callback-return */
          err.errors.map((error) => {
            errors.push(error.message);
          });
        }
        res.status(400).json(errors);
      });
  }
  /**
   * Update a  Recipe
   * @param {object} req
   * @param {object} res
   * @param {object} model
   * @returns  {JSON} Returns success or failure message
   */
  static editRecipe(req, res) {
    const id = parseInt(req.params.recipeId, 10);
    const userId = req.decoded.id;
    Recipes
      .find({
        where: {
          id
        }
      })
      .then((recipes) => {
        if (!recipes) {
          return recipeNotFound(res);
        }
        validateUser(res, userId, recipes);
        if (recipes.userId === userId) {
          return recipes
            .update({
              recipeName: req.body.recipeName || recipes.recipeName,
              mealType: req.body.mealType || recipes.mealType,
              description: req.body.description || recipes.description,
              method: req.body.method || recipes.method,
              ingredients: req.body.ingredients || recipes.ingredients,
              image: req.body.image || recipes.image
            })
            .then(updatedRecipes => res.status(200).send({
              Recipe: updatedRecipes,
              message: 'Recipe successfully updated'
            }));
        }
      })
      .catch((err) => {
        const errors = [];
        if (err.name === 'SequelizeValidationError') {
          /* eslint-disable array-callback-return */
          err.errors.map((error) => {
            errors.push(error.message);
          });
        }
        res.status(400).json(errors);
      });
  }
  /**
   * Delete a  Recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static deleteRecipe(req, res) {
    const userId = req.decoded.id;
    Recipes
      .find({
        where: {
          id: req.params.recipeId
        }
      })
      .then((recipes) => {
        if (!recipes) {
          return recipeNotFound(res);
        }
        validateUser(res, userId, recipes);
        if (recipes.userId === userId) {
          return recipes
            .destroy()
            .then(() => res.status(200).send({
              message: 'recipe successfully deleted'
            }));
        }
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * Get  Recipes
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static getRecipe(req, res) {
    let offset;
    const limit = 6;
    let singlePage;
    let pages;
    const { order, sort } = req.query;
    if (order || sort) {
      switch (sort) {
        case 'upvotes':
          recipe.getRecipeInOrder(req, res, order);
          break;
        case 'downvotes':
          recipe.getRecipeInOrder(req, res, order);
          break;
        default:
          if ((sort !== 'upvotes' || 'downvotes') && (order !== 'desc' || 'asc')) {
            return res.status(400).send({
              error: 'invalid query params'
            });
          }
      }
    }
    if (!order && !sort) {
      Recipes
        .findAndCountAll()
        .then((recipes) => {
          if (recipes.length === 0) {
            return res.status(200).send({
              message: 'No recipes have been added'
            });
          }
          const remainder = recipes.count % limit === 0 ?
            0 : 1;
          pages = Math.floor(recipes.count / limit) + remainder;
          singlePage = parseInt(req.query.page, 10);
          offset = singlePage * limit;

          return Recipes
            .findAll({
              limit,
              offset,
              pages,
            })
            .then(allRecipes => res.status(200).send({
              allRecipes,
              pages
            }));
        })
        .catch(error => res.status(400).send(error));
    }
  }

  /**
   * Get  all Recipes in an order (descending or ascending)
   * @param {object} req
   * @param {object} res
   * @param {object} order
   * @returns  {JSON} Returns all recipes in ascending order
   */
  static getRecipeInOrder(req, res, order) {
    if (order === 'desc') {
      return recipe.getRecipeInDescending(req, res);
    }
    if (order === 'asc') {
      return recipe.getRecipeInAscending(req, res);
    }
    return res.status(400).send({
      error: 'invalid query params'
    });
  }

  /**
   * Get  all Recipes according to most voted in ascending order
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns all recipes in ascending order
   */
  static getRecipeInAscending(req, res) {
    const { sort } = req.query;
    Recipes
      .findAll({
        order: [
          [sort, 'ASC']
        ],
      })
      .then(sortedRecipes => res.status(200).send(sortedRecipes));
  }
  /**
   * Get  all Recipes according to most voted in descending order
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns all recipes in descending order
   */
  static getRecipeInDescending(req, res) {
    const { sort } = req.query;
    Recipes
      .findAll({
        order: [
          [sort, 'DESC']
        ],
        limit: 10
      })
      .then(sortedRecipes => res.status(200).send(sortedRecipes));
  }

  /**
   * Get  a particular Recipe
   * @param {object} req
   * @param {object} res
   * @param {object} reviews
   * @returns  {JSON} Returns success or failure message
   */
  static getARecipe(req, res, reviews) {
    Recipes
      .find({
        where: {
          id: req.params.recipeId
        },
        include: [
          {
            model: reviews,
            attributes: ['userId', 'recipeId', 'review', 'username'],
          }
        ]
      })
      .then((recipes) => {
        if (!recipes) {
          recipeNotFound(res);
        } else {
          return res.status(200).send(recipes);
        }
      })
      .catch(err => res.status(400).send(err));
  }

  /**
   * Get  all recipes added by a user
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns user recipes
   */
  static getUserRecipe(req, res) {
    const userId = req.decoded.id;
    const params = parseInt(req.params.userId, 10);
    let offset;
    const limit = 6;
    let singlePage;
    let pages;
    Recipes
      .findAndCountAll({
        where: {
          userId
        },
      })
      .then((userRecipe) => {
        if (!userRecipe) {
          return res.status(404).send({
            message: 'You have not add any recipe'
          });
        }
        if (params !== userId) {
          res.status(403).send({
            message: 'You are not allowed to perform this action'
          });
        }
        const remainder = userRecipe.count % limit === 0 ?
          0 : 1;
        pages = Math.floor(userRecipe.count / limit) + remainder;
        singlePage = parseInt(req.query.page, 10);
        offset = singlePage * limit;

        return Recipes
          .findAll({
            where: {
              userId
            },
            limit,
            offset,
            pages,
          })
          .then(userRecipes => res.status(200).send({
            userRecipes,
            pages
          }));
      })
      .catch(err => res.status(500).send(err));
  }
}
