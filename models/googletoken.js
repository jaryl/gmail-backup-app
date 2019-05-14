module.exports = (sequelize, DataTypes) => {
  const GoogleToken = sequelize.define('GoogleToken', {
    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    scope: DataTypes.STRING,
    tokenType: DataTypes.STRING,
    expiryDate: DataTypes.DATE,
  }, {});

  GoogleToken.associate = function associations(models) {
    // TODO: add association to mailbox
  };

  return GoogleToken;
};
