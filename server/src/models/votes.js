export default (sequelize, DataTypes) => {
  const votes = sequelize.define('votes', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    upvotes: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    downvotes: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  votes.associate = (models) => {
    votes.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    votes.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return votes;
};
