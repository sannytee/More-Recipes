import favoriteHelper from '../helper/favorite';

export default {
  add(req, res) {
    const id = req.params.userId;
    if (isNaN(id)) {
      return res.status(400).send({
        message: 'Parameter should be a number'
      });
    }
    if (!req.body.recipeId) {
      return res.status(400).send({
        error: 'Recipe Id is required'
      });
    }
    favoriteHelper.create(req, res);
  },
  get(req, res) {
    if (parseInt(req.params.userId, 10) !== req.decoded.id) {
      return res.status(403).send({
        message: 'Permission denied '
      });
    }
    favoriteHelper.fetch(req, res);
  },
  getIds(req, res) {
    if (parseInt(req.params.userId, 10) !== req.decoded.id) {
      return res.status(403).send({
        message: 'Permission denied '
      });
    }
    favoriteHelper.fetchRecipesId(req, res);
  }
};

