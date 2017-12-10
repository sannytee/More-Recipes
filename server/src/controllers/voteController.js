import { Recipes } from '../models';
import upvoter from '../helper/upvotes';

export default {
  vote(req, res) {
    const { action } = req.query;
    if (!action) {
      return res.status(400).send({
        error: 'Enter a query params'
      });
    }
    if (req.query.action) {
      if (action === 'upvotes' || action === 'downvotes') {
        return Recipes
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
      return res.status(400).send({
        error: 'Invalid query params'
      });
    }
  }
};
