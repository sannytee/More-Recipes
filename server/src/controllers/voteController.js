import { Recipes } from '../models';
import upvoter from '../helper/upvotes';

export default {
  vote(req, res) {
    if (!req.query.action) {
      return res.status(400).send({
        error: 'Enter a query params'
      });
    }
    if (req.query.action !== 'upvotes' || 'downvotes') {
      return res.status(400).send({
        error: 'Invalid query params'
      });
    }
    if (req.query.action === 'upvotes' || 'downvotes') {
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
          return upvoter.checkUpvotes(req, res, found);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  }
};
