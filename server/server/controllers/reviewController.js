import { reviews, Recipes } from '../models';
import reviewHelper from '../helper/review';

export default {
  /**
   * Post reviews
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  add(req, res) {
    const id = req.params.recipeId;
    if (isNaN(id)) {
      res.status(400).send({
        message: 'Parameter should be a nuber'
      });
    }
    reviewHelper.addReview(req, res, Recipes, reviews);
  }
};
