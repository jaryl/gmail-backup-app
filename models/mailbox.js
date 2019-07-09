module.exports = (sequelize, DataTypes) => {
  const Mailbox = sequelize.define('Mailbox', {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    accountId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'Accounts',
        key: 'id',
      },
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});

  Mailbox.associate = function associations(models) {
    Mailbox.belongsTo(models.Account, {
      foreignKey: 'accountId',
      sourceKey: 'id',
    });
    Mailbox.hasMany(models.Label, {
      foreignKey: 'mailboxId',
      sourceKey: 'id',
    });
  };

  return Mailbox;
};
