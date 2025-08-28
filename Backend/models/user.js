'use strict';
module.exports = (sequelize, DataTypes) => {
    // Define modelo 'User'
  const User = sequelize.define('User', {
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, unique: true,
      validate: { isEmail: true } },
    passwordHash: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    role: { 
      type: DataTypes.ENUM('ADMIN', 'CLIENT'),
      allowNull: false, defaultValue: 'CLIENT' 
    }
  }
);

  User.associate = function(models) {
    User.hasMany(models.Purchase, { foreignKey: 'userId' });
  };

  return User;
};
