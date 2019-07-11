module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Messages', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    mailboxId: {
      allowNull: false,
      references: {
        model: 'Mailboxes',
        key: 'id',
      },
      type: Sequelize.UUID,
    },
    threadId: {
      allowNull: false,
      references: {
        model: 'Threads',
        key: 'id',
      },
      type: Sequelize.UUID,
    },
    providerId: {
      allowNull: false,
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
  }).then(() => {
    queryInterface.addIndex('Messages', ['threadId']);
  }).then(() => {
    queryInterface.addIndex('Messages', ['providerId']);
  }).then(() => {
    queryInterface.addIndex('Messages', ['mailboxId', 'providerId'], {
      unique: true,
    });
  }),

  down: queryInterface => queryInterface.dropTable('Messages'),
};
