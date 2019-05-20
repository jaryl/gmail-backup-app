module.exports = (sequelize, DataTypes) => {
  const GoogleToken = sequelize.define('GoogleToken', {
    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    googleId: DataTypes.STRING,
  }, {});

  GoogleToken.associate = function associations(models) {
    // TODO: add association to mailbox
  };

  return GoogleToken;
};
