import voter from './voter';
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
    Recipes
      .create({
        userId: req.decoded.id,
        recipeName: req.body.recipeName,
        mealType: req.body.mealType,
        description: req.body.description,
        method: req.body.method,
        ingredients: req.body.ingredients,

      })
      .then(recipes => res.status(201).send({
        success: true,
        data: recipes,
        message: 'Recipe successfully added'
      }))
      .catch(err => res.status(400).send(err));
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
        if (!recipes) {
          return res.status(404).send({
            message: 'Recipe not found'
          });
        }
        return recipes
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
   * @param {object} reviews
   * @returns  {JSON} Returns success or failure message
   */
  static getRecipe(req, res, reviews) {
    if (req.query.order || req.query.sort) {
      return Recipes
        .findAll({
          order: [
            [req.query.sort, 'DESC']
          ],
          include: [
            {
              model: reviews,
              attributes: ['userId', 'recipeId', 'review'],
            }
          ]
        })
        .then(sortedRecipes => res.status(200).send(sortedRecipes));
    }
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
   * check if recipe exists
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static checkExistingRecipe(req, res) {
    Recipes
      .find({
        where: {
          id: req.params.recipeId,
        }
      })
      .then((found) => {
        if (!found) {
          return res.status(404).send({
            message: 'Recipe not found'
          });
        }
        voter.createUpvotes(req, res);
      })
      .catch(err => res.status(400).send(err));
  }
}
