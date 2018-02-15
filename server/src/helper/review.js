import { reviews, Recipes } from '../models';
import { recipeNotFound } from '../middlewares/validation';
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
          recipeNotFound(res);
        } else {
          reviews
            .create({
              userId: req.decoded.id,
              username: req.decoded.username,
              recipeId: req.params.recipeId,
              review: req.body.review,
            })
            .then(created => res.status(201).send({
              message: 'Review posted',
              review: created,
            }))
            .catch((err) => {
              if (err.name === 'SequelizeValidationError') {
                return res.status(400).send({
                  message: 'Review cannot be empty'
                });
              }
              return res.status(500).send(err);
            });
        }
      })
      .catch(err => res.status(400).send(err));
  }
}
