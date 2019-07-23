module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('Thread', {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    mailboxId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'Mailboxes',
        key: 'id',
      },
    },
    providerId: {
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      type: DataTypes.STRING,
    },
  }, {});

  Thread.associate = (models) => {
    Thread.belongsTo(models.Mailbox, {
      foreignKey: 'mailboxId',
      sourceKey: 'id',
    });

    Thread.hasMany(models.Message, {
      foreignKey: 'threadId',
      sourceKey: 'id',
    });
  };

  return Thread;
};
