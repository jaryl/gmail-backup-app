module.exports = (sequelize, DataTypes) => {
  const Label = sequelize.define('Label', {
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
    name: {
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255],
      },
      type: DataTypes.STRING,
    },
    type: {
      validate: {
        notEmpty: true,
      },
      type: DataTypes.STRING,
    },
  }, {});

  Label.associate = (models) => {
    Label.belongsTo(models.Mailbox, {
      foreignKey: 'mailboxId',
      sourceKey: 'id',
    });
  };

  return Label;
};
