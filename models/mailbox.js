module.exports = (sequelize, DataTypes) => {
  const Mailbox = sequelize.define('Mailbox', {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Accounts',
        key: 'id',
      },
    },
  }, {});

  Mailbox.associate = function associations(models) {
    Mailbox.belongsTo(models.Account, {
      foreignKey: 'accountId',
      sourceKey: 'id',
    });
  };
  return Mailbox;
};
