import { Recipes } from '../models';
import downvoter from '../helper/downvotes';
import upvoter from '../helper/upvotes';

export default {
  upvote(req, res) {
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
        return upvoter.checkUpvotes(req, res);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },
  downvote(req, res) {
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
        return downvoter.checkDownvotes(req, res);
      })
      .catch(err => res.status(400).send(err));
  }
};
