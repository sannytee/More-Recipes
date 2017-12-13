/** Checks if recipe exist
 * @param {object} res
 * @param  {object} recipe
 */

export const checkRecipe = (res, recipe) => {
  if (recipe === null) {
    return res.status(404).send({
      message: 'Recipe not found'
    });
  }
};

export const checkBeforeCreatingRecipe = (req, res, next) => {
  const error = { };
  let value;
  if (!req.body.recipeName) {
    error.error = 'name of recipe required';
    value = true;
  }
  if (!req.body.mealType) {
    error.error = 'mealtype required';
    value = true;
  }
  if (!req.body.description) {
    error.error = 'description required';
    value = true;
  }
  if (!req.body.method) {
    error.error = 'Method of cooking required';
    value = true;
  }
  if (!req.body.ingredients) {
    error.error = 'Input ingredients required';
    value = true;
  }
  if (value === true) {
    return res.status(400).send(error);
  }
  next();
};

export const checkReqParams = (req, res, next) => {
  const params = (req.params.recipeId || req.params.userId);
  if (isNaN(params)) {
    return res.status(400).send({
      message: 'Parameter should be a number'
    });
  }
  next();
};
