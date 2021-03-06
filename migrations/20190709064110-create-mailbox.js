module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Mailboxes', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    accountId: {
      allowNull: false,
      references: {
        model: 'Accounts',
        key: 'id',
      },
      type: Sequelize.UUID,
    },
    providerType: {
      allowNull: false,
      type: Sequelize.ENUM,
      values: ['GMAIL'],
    },
    providerId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
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
    queryInterface.addIndex('Mailboxes', ['accountId']);
  }).then(() => {
    queryInterface.addIndex('Mailboxes', ['accountId', 'email'], {
      unique: true,
    });
  }),

  down: queryInterface => queryInterface.dropTable('Mailboxes'),
};
