import { favorites, Recipes } from '../models';
/**
 * @class favorite
 */
export default class favorite {
  /**
   * favorite a recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static create(req, res) {
    const id = parseInt(req.body.recipeId, 10);
    Recipes
      .find({
        where: {
          id
        }
      })
      .then((recipes) => {
        if (!recipes) {
          return res.status(404).send({
            error: 'Recipe not found'
          });
        }
        favorites
          .find({
            where: {
              recipeId: id
            }
          })
          .then((foundFavorite) => {
            if (foundFavorite) {
              foundFavorite.destroy();
              return res.status(200).send({
                message: 'Recipe removed from favorites'
              });
            }
            favorites
              .create({
                recipeId: id,
                userId: req.decoded.id,
              })
              .then((favorited) => {
                res.status(201).send({
                  message: 'Recipe Favorited',
                  favorited
                });
              })
              .catch(err => res.status(400).send(err));
          })
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  }
  /**
   * get  all favorite recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static fetch(req, res) {
    favorites
      .findAll({
        where: {
          userId: req.decoded.id,
        },
        include: [
          {
            model: Recipes
          }
        ]
      })
      .then((favorited) => {
        if (favorited.length === 0) {
          return res.status(200).send({
            message: 'You have no favorite recipes'
          });
        }
        res.status(200).send(favorited);
      })
      .catch(err => res.status(400).send(err));
  }
  /**
   * get  all favorite recipe ids
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static fetchRecipesId(req, res) {
    const recipeIds = [];
    favorites
      .findAll({
        where: {
          userId: req.decoded.id,
        }
      })
      .then((favoriteRecipeIds) => {
        favoriteRecipeIds.map(favoriteRecipeId => recipeIds.push(favoriteRecipeId.recipeId));
        return res.status(200).send({
          recipeIds
        });
      })
      .catch(err => res.status(500).send(err));
  }
}
