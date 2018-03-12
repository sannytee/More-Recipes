module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'image', {
    type: Sequelize.STRING,
    allowNull: true,
  }),

  down: queryInterface => queryInterface.removeColumn('Users', 'image')
};
