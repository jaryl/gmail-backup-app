module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255],
      },
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255],
      },
      type: DataTypes.STRING,
    },
  }, {});

  Account.associate = function associations(models) {
    Account.hasMany(models.Mailbox, {
      foreignKey: 'accountId',
      sourceKey: 'id',
    });
  };

  return Account;
};
