module.exports = {

  up: (queryInterface, Sequelize) => queryInterface.createTable('Mailboxes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    emailAddress: {
      type: Sequelize.STRING,
    },
    messagesTotal: {
      type: Sequelize.INTEGER,
    },
    threadsTotal: {
      type: Sequelize.INTEGER,
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

  down: queryInterface => queryInterface.dropTable('Mailboxes'),

};
