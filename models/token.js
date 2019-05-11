module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    scope: DataTypes.STRING,
    tokenType: DataTypes.STRING,
    expiryDate: DataTypes.DATE,
  }, {});

  Token.associate = function associations(models) {
    // TODO: add association to mailbox
  };

  return Token;
};
