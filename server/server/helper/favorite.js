/**
 * @class favorite
 */
export default class favorite {
  /**
   * favorite a recipe
   * @param {object} req
   * @param {object} res
   * @param {object} model
   * @param {object} favorites
   * @returns  {JSON} Returns success or failure message
   */
  static create(req, res, model, favorites) {
    model
      .find({
        where: {
          id: req.body.recipeId
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
              recipeId: req.body.recipeId
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
                recipeId: req.body.recipeId,
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
}
