module.exports = {

  up: (queryInterface, Sequelize) => queryInterface.createTable('Tokens', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: Sequelize.INTEGER,
    },
    accessToken: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    refreshToken: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    scope: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    tokenType: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    expiryDate: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: queryInterface => queryInterface.dropTable('Tokens'),

};
