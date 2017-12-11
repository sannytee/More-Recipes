import { Recipes } from '../models';

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
    const {
      recipeName,
      mealType,
      description,
      method,
      ingredients
    } = req.body;
    const id = parseInt(req.params.recipeId, 10);
    Recipes
      .find({
        where: {
          userId: req.decoded.id,
          id,
        }
      })
      .then((recipes) => {
        if (!recipes) {
          return res.status(404).send({
            message: 'Recipe not found'
          });
        }
        return recipes
          .update({
            recipeName: recipeName || recipes.recipeName,
            mealType: mealType || recipes.mealType,
            description: description || recipes.description,
            method: method || recipes.method,
            ingredients: ingredients || recipes.ingredients,
          })
          .then(updatedRecipes => res.status(200).send({
            data: updatedRecipes,
            message: 'Recipe successfully updated'
          }));
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
        if (!recipes) {
          return res.status(404).send({
            message: 'Recipe not found'
          });
        }
        return recipes
          .destroy()
          .then(() => res.status(200).send({
            message: 'recipe successfully deleted'
          }));
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
          if (order === 'desc') {
            return recipe.getRecipeInDescending(req, res);
          }
          if (order === 'asc') {
            return recipe.getRecipeInAscending(req, res);
          }
          return res.status(400).send({
            error: 'invalid query params'
          });
        case 'downvotes':
          if (order === 'desc') {
            return recipe.getRecipeInDescending(req, res);
          }
          if (order === 'asc') {
            return recipe.getRecipeInAscending(req, res);
          }
          return res.status(400).send({
            error: 'invalid query params'
          });
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
        if (!recipes) {
          return res.status(404).send({
            message: 'Recipe not found'
          });
        }
        return res.status(200).send(recipes);
      })
      .catch(err => res.status(400).send(err));
  }

  /**
   * Checks input for recipe
   * @param {object} req
   * @param {object} res
   * @param {object} reviews
   * @returns  {JSON} Returns success or failure message
   */
  static checkBeforeCreating(req, res) {
    const error = { };
    let value;
    const {
      recipeName,
      mealType,
      description,
      method,
      ingredients
    } = req.body;
    if (!recipeName) {
      error.error = 'name of recipe required';
      value = true;
    }
    if (!mealType) {
      error.error = 'mealtype required';
      value = true;
    }
    if (!description) {
      error.error = 'description required';
      value = true;
    }
    if (!method) {
      error.error = 'Method of cooking required';
      value = true;
    }
    if (!ingredients) {
      error.error = 'Input ingredients required';
      value = true;
    }
    if (value === true) {
      return res.status(400).send(error);
    }
    recipe.createRecipe(req, res);
  }
}
