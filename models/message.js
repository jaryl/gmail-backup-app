module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
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
    threadId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'Threads',
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
    receivedAt: {
      allowNull: false,
      validate: {
        isDate: true,
      },
      type: DataTypes.DATE,
    },
    snippet: {
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      type: DataTypes.STRING,
    },
    payload: {
      allowNull: false,
      type: DataTypes.BLOB('tiny'),
    },
    size: {
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
      type: DataTypes.STRING,
    },
  }, {});

  Message.associate = (models) => {
    Message.belongsTo(models.Mailbox, {
      foreignKey: 'mailboxId',
      sourceKey: 'id',
    });

    Message.belongsTo(models.Thread, {
      foreignKey: 'threadId',
      sourceKey: 'id',
    });
  };

  return Message;
};
