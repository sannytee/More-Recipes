/**
 * @class recipe
 */
export default class recipe {
  /**
   * Create a new User
   * @param {object} req
   * @param {object} res
   * @param {object} model
   * @returns  {JSON} Returns success or failure message
   */
  static createRecipe(req, res, model) {
    model
      .create({
        userId: req.decoded.id,
        recipeName: req.body.recipeName,
        mealType: req.body.mealType,
        description: req.body.description,
        method: req.body.method,
        ingredients: req.body.ingredients,

      })
      .then(recipes => res.status(201).send({
        success: true,
        data: recipes,
        message: 'Recipe successfully added'
      }))
      .catch(err => res.status(400).send(err));
  }
}
