export default (sequelize, DataTypes) => {
  const favorites = sequelize.define('favorites', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  return favorites;
};
