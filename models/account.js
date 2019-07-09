module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});

  Account.associate = function associations(models) {
    Account.hasMany(models.Mailbox, {
      foreignKey: 'accountId',
      sourceKey: 'id',
    });
  };
  return Account;
};
