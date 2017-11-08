import { votes, Recipes } from '../models';
import voter from '../helper/votes';

export default {
  upvote(req, res) {
    const id = req.params.recipeId;
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
        voter.findRecipeToUpdate(req, res, Recipes, id);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
};
