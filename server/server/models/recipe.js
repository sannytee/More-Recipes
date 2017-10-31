export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Recipe name is required'
        }
      }
    },
    mealType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Meal type is required'
        },
        isIn: {
          args: [
            ['breakfast', 'brunch', 'elevenses', 'lunch', 'tea', 'supper', 'dinner']
          ],
          msg: 'Any of the meal type is required'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'Please enter a description'
        }
      }
    },
    method: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'Please enter the method of cooking'
        }
      }
    },
    ingredients: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'Enter the required ingredients'
        }
      }
    },
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  return Recipe;
};
