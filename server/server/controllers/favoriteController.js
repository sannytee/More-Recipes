import { favorites, Recipes } from '../models';
import favoriteHelper from '../helper/favorite';

export default {
  add(req, res) {
    const id = req.params.userId;
    if (isNaN(id)) {
      res.status(400).send({
        message: 'Parameter should be a number'
      });
    }
    favoriteHelper.create(req, res, Recipes, favorites);
  },
  get(req, res) {
    if (parseInt(req.params.userId, 10) !== req.decoded.id) {
      return res.status(403).send({
        message: 'Permission denied '
      });
    }
    favoriteHelper.fetch(req, res, favorites, Recipes);
  }
};

