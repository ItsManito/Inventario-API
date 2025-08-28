'use strict';
module.exports = (sequelize, DataTypes) => {
    // Define el modelo 'PurchaseItem' usando sequelize.define
  const PurchaseItem = sequelize.define('PurchaseItem', {
    purchaseId: { 
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    productId: { 
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    quantity: { 
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    priceAtPurchase: { 
      type: DataTypes.DECIMAL(10,2), 
      allowNull: false 
    }
  }, { tableName: 'PurchaseItems' });

  PurchaseItem.associate = function(models) {
  };

  return PurchaseItem;
};
