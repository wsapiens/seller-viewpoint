'use strict';
module.exports = (sequelize, DataTypes) => {
  var Purchases = sequelize.define('Purchases', {
    quantity: DataTypes.INTEGER,
    unitPrice: DataTypes.DECIMAL(10, 2),
    orderCost: DataTypes.DECIMAL(10, 2),
    shippingCost: DataTypes.DECIMAL(10, 2),
    miscCost: DataTypes.DECIMAL(10, 2),
    totalCost: DataTypes.DECIMA(10, 2),
    organizationId: {
      type: DataTypes.INTEGER,
      references: 'organizations', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    },
    supplierId: {
      type: DataTypes.INTEGER,
      references: 'suppliers', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    },
    productId: {
      type: DataTypes.INTEGER,
      references: 'products', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    }
  }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: true,
    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: false,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    tableName: 'purchases'
  });
  Purchases.associate = function(models) {
    models.Purchases.belongsTo(models.Organizations, {
      onDelete: 'CASCADE',
      foreignKey: 'organizationId',
      targetKey: 'id'
    });
    models.Purchases.belongsTo(models.Suppliers, {
      onDelete: 'CASCADE',
      foreignKey: 'supplierId',
      targetKey: 'id'
    });
    models.Purchases.belongsTo(models.Products, {
      onDelete: 'CASCADE',
      foreignKey: 'productId',
      targetKey: 'id'
    });
  };
  return Purchases;
};
