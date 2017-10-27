import db from '../db';

/**
 * @class votes
*/
export default class votes {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  static getMostVotedRecipe(req, res) {
    const compareFunct = ((a, b) => a.upvotes < b.upvotes);
    const upvoted = db.recipes.sort(compareFunct);
    return res.status(200).send(upvoted);
  }
}

