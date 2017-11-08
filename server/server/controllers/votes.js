import { votes } from '../models';
import recipe from '../helper/recipe';

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
  }
};
