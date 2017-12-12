import { Recipes } from '../models';
import { checkRecipe } from '../middlewares/validation';

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
      ingredients
    } = req.body;
    Recipes
      .create({
        userId: req.decoded.id,
        recipeName,
        mealType,
        description,
        method,
        ingredients,

      })
      .then(recipes => res.status(201).send({
        success: true,
        data: recipes,
        message: 'Recipe successfully added'
      }))
      .catch(err => res.status(400).json(err));
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
    Recipes
      .find({
        where: {
          userId: req.decoded.id,
          id,
        }
      })
      .then((recipes) => {
        checkRecipe(res, recipes);
        if (recipes) {
          recipes
            .update({
              recipeName: req.body.recipeName || recipes.recipeName,
              mealType: req.body.mealType || recipes.mealType,
              description: req.body.description || recipes.description,
              method: req.body.method || recipes.method,
              ingredients: req.body.ingredients || recipes.ingredients,
            })
            .then(updatedRecipes => res.status(200).send({
              data: updatedRecipes,
              message: 'Recipe successfully updated'
            }));
        }
      })
      .catch(err => res.status(400).send(err));
  }
  /**
   * Delete a  Recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static deleteRecipe(req, res) {
    Recipes
      .find({
        where: {
          userId: req.decoded.id,
          id: req.params.recipeId
        }
      })
      .then((recipes) => {
        checkRecipe(res, recipes);
        if (recipes) {
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
      return Recipes
        .all()
        .then((recipes) => {
          if (recipes.length === 0) {
            return res.status(200).send({
              message: 'No recipes have been added'
            });
          }
          return res.status(200).send(recipes);
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
            attributes: ['userId', 'recipeId', 'review'],
          }
        ]
      })
      .then((recipes) => {
        checkRecipe(res, recipes);
        if (recipes) {
          return res.status(200).send(recipes);
        }
      })
      .catch(err => res.status(400).send(err));
  }
}
