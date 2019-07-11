module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Threads', {
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
    providerId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    labelIds: {
      allowNull: false,
      type: Sequelize.ARRAY(Sequelize.UUID),
      defaultValue: [],
    },
    snippet: {
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
    queryInterface.addIndex('Threads', ['mailboxId']);
  }).then(() => {
    queryInterface.addIndex('Threads', ['providerId']);
  }).then(() => {
    queryInterface.addIndex('Threads', ['mailboxId', 'providerId'], {
      unique: true,
    });
  }),

  down: queryInterface => queryInterface.dropTable('Threads'),
};
