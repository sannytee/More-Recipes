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
 }