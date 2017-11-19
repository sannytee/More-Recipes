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
              return res.status(400).send({
                message: 'Recipe already favorited'
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
        if (!favorited) {
          return res.status(404).send({
            message: 'You have no favorite recipe yet'
          });
        }
        res.status(200).send(favorited);
      })
      .catch(err => res.status(400).send(err));
  }
}
