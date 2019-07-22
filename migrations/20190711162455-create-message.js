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
    snippet: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    receivedAt: {
      allowNull: false,
      validate: {
        isDate: true,
      },
      type: Sequelize.DATE,
    },
    size: {
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
      type: Sequelize.STRING,
    },
    labelIds: {
      allowNull: false,
      type: Sequelize.ARRAY(Sequelize.UUID),
      defaultValue: [],
    },
    payload: {
      allowNull: false,
      type: Sequelize.TEXT,
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
