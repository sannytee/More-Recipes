export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This username already exist'
      },
      validate: {
        notEmpty: {
          msg: 'Username is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This email already exists'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'This email is invalid'
        },
        notEmpty: {
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        }
      }
    }
  });
  Users.associate = (models) => {
    Users.hasMany(models.Recipes, {
      foreignKey: 'userId'
    });
    Users.hasMany(models.favorites, {
      foreignKey: 'userId'
    });
    Users.hasMany(models.reviews, {
      foreignKey: 'userId'
    });
  };
  return Users;
};
