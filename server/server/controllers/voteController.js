import { votes } from '../models';
import recipe from '../helper/recipe';
import voter from '../helper/downvotes';

export default {
  upvote(req, res) {
    votes
      .find({
        where: {
          userId: req.decoded.id,
          recipeId: req.params.recipeId,
        }
      })
      .then((found) => {
        if (found.upvotes === true) {
          return res.status(400).send({
            message: 'You have already upvoted this recipe'
          });
        }
        recipe.checkExistingRecipe(req, res);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },
  downvote(req, res) {
    votes
      .find({
        where: {
          userId: req.decoded.id,
          recipeId: req.params.recipeId,
        }
      })
      .then((found) => {
        if (found.downvotes === true) {
          return res.status(400).send({
            message: 'You have already downvoted this recipe'
          });
        }
        if (found.upvotes === true && found.downvotes === false) {
          voter.alreadyUpvoted(req, res);
        }
        recipe.findRecipe(req, res);
      })
      .catch(err => res.status(400).send(err));
  }
};
