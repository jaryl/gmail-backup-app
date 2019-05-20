module.exports = {

  up: (queryInterface, Sequelize) => queryInterface.createTable('GoogleTokens', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: Sequelize.INTEGER,
    },
    googleId: {
      allowNull: false,
      type: Sequelize.STRING,
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
