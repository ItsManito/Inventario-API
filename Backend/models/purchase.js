'use strict';
module.exports = (sequelize, DataTypes) => {
  // Define el modelo 'Purchase' usando sequelize.define
  const Purchase = sequelize.define('Purchase', {
    totalPrice: {
       type: DataTypes.DECIMAL(10,2),
        allowNull: false,
         defaultValue: 0 
        },
    userId: { 
      type: DataTypes.INTEGER,
       allowNull: false 
      }
  }
);
  // Define las asociaciones/relaciones del modelo
  Purchase.associate = function(models) {
    Purchase.belongsTo(models.User, { foreignKey: 'userId' });
    Purchase.belongsToMany(models.Product, { through: models.PurchaseItem, foreignKey: 'purchaseId' });
  };

  return Purchase;
};
