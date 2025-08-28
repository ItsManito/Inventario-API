'use strict';
module.exports = (sequelize, DataTypes) => {
    // Definir el modelo 'Product'
  const Product = sequelize.define('Product', {
    lotNumber: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    price: { 
      type: DataTypes.DECIMAL(10,2), 
      allowNull: false 
    },
    quantityAvailable: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      defaultValue: 0 
    },
    entryDate: { type: DataTypes.DATEONLY, allowNull: false }
  }
);

  Product.associate = function(models) {
    Product.belongsToMany(models.Purchase, { through: models.PurchaseItem, foreignKey: 'productId' });
  };

  return Product;
};
