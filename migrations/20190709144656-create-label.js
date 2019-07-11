module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Labels', {
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
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    type: {
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
    queryInterface.addIndex('Labels', ['mailboxId']);
  }).then(() => {
    queryInterface.addIndex('Labels', ['mailboxId', 'name'], {
      unique: true,
    });
  }),

  down: queryInterface => queryInterface.dropTable('Labels'),
};
