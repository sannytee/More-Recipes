import db from '../db';
/**
 * @class reviewController
*/
export default class review {
  /**
   * get  all Recipe
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  static addReview(req, res) {
    if (!req.body.review) {
      res.status(400).send({
        Message: 'Please enter Review'
      });
    } else {
      const len = db.review.length;
      const id = 1 + len;
      db.review.push({
        id,
        recipeId: req.params.Id,
        userId: req.body.userId,
        review: req.body.review
      });
      res.status(201).send(db.review[id - 1]);
    }
  }
}
