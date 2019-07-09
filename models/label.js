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
    externalId: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
  }, {});

  Label.associate = (models) => {
    Label.belongsTo(models.Mailbox, {
      foreignKey: 'mailboxId',
      sourceKey: 'id',
    });
  };

  return Label;
};
