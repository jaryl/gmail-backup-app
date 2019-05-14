module.exports = (sequelize, DataTypes) => {
  const Mailbox = sequelize.define('Mailbox', {
    emailAddress: DataTypes.STRING,
    messagesTotal: DataTypes.INTEGER,
    threadsTotal: DataTypes.INTEGER,
  }, {});
  Mailbox.associate = function associations(models) {
    // associations can be defined here
  };
  return Mailbox;
};
