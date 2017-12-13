import reviewHelper from '../helper/review';

export default {
  /**
   * Post reviews
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  add(req, res) {
    if (!req.body.review) {
      return res.status(400).send({
        message: 'Review cannot be empty'
      });
    }
    reviewHelper.addReview(req, res);
  }
};
