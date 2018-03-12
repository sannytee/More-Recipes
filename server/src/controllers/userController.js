import account from '../helper/account';
import Recipe from '../helper/recipe';

export default {
  /**
   * Enables Users to signup for account
   * @param {Object}  req
   * @param {Object} res
   * @returns  {JSON} Returns success or failure message
   */
  signup(req, res) {
    account.createUser(req, res);
  },
  /**
   * Enables Users to signin into account
   * @param {Object}  req
   * @param {Object} res
   * @returns  {JSON} Returns success or failure message
   */
  signIn(req, res) {
    account.signInUser(req, res);
  },
  /**
   * Enables Users to get all thier recipes
   * @param {Object}  req
   * @param {Object} res
   * @returns  {JSON} Returns user recipes
   */
  myRecipes(req, res) {
    Recipe.getUserRecipe(req, res);
  },
  /**
   * Enables Users to get their details
   * @param {Object}  req
   * @param {Object} res
   * @returns  {JSON} Returns user recipes
   */
  getInfo(req, res) {
    account.fetchUser(req, res);
  },
  /**
   * Enables Users to update their image
   * @param {Object}  req
   * @param {Object} res
   * @returns  {JSON} Returns user recipes
   */
  updateImage(req, res) {
    const userId = parseInt(req.params.userId, 10);
    if (userId !== req.decoded.id) {
      return res.status(403).send({
        message: 'Permission denied'
      });
    }
    account.updateImage(req, res);
  }
};

