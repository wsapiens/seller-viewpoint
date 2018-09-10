'use strict';
module.exports = (sequelize, DataTypes) => {
  var Purchases = sequelize.define('Purchases', {
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.DECIMAL(10, 2),
    order_cost: DataTypes.DECIMAL(10, 2),
    shipping_cost: DataTypes.DECIMAL(10, 2),
    misc_cost: DataTypes.DECIMAL(10, 2),
    total_cost: DataTypes.DECIMAL(10, 2),
    description: DataTypes.STRING,
    organization_id: {
      type: DataTypes.INTEGER,
      references: 'organizations', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      references: 'suppliers', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: 'products', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    }
  }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: true,
    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    tableName: 'purchases'
  });
  Purchases.associate = function(models) {
    models.Purchases.belongsTo(models.Organizations, {
      onDelete: 'CASCADE',
      foreignKey: 'organization_id',
      targetKey: 'id'
    });
    models.Purchases.belongsTo(models.Suppliers, {
      onDelete: 'CASCADE',
      foreignKey: 'supplier_id',
      targetKey: 'id'
    });
    models.Purchases.belongsTo(models.Products, {
      onDelete: 'CASCADE',
      foreignKey: 'product_id',
      targetKey: 'id'
    });
  };
  return Purchases;
};
