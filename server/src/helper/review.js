import { reviews, Recipes } from '../models';
/**
 * @class review
 */
export default class review {
  /**
   * Post a review
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns success or failure message
   */
  static addReview(req, res) {
    Recipes
      .find({
        where: {
          id: req.params.recipeId
        }
      })
      .then((recipes) => {
        if (!recipes) {
          return res.status(404).send({
            message: 'Recipe not found'
          });
        }
        reviews
          .create({
            userId: req.decoded.id,
            recipeId: req.params.recipeId,
            review: req.body.review,
          })
          .then(created => res.status(201).send({
            message: 'Review posted',
            review: created,
          }))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  }
}
