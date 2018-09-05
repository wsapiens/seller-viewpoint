'use strict';
module.exports = (sequelize, DataTypes) => {
  var Orders = sequelize.define('Orders', {
    shippingCost: DataTypes.DECIMAL(10, 2),
    cancel: DataTypes.BOOLEAN,
    organizationId: {
      type: DataTypes.INTEGER,
      references: 'organizations', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    },
    customerId: {
      type: DataTypes.INTEGER,
      references: 'customers', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    },
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
    tableName: 'orders'
  });
  Orders.associate = function(models) {
    models.Orders.belongsTo(models.Organizations, {
      onDelete: 'CASCADE',
      foreignKey: 'organizationId',
      targetKey: 'id'
    });
    models.Orders.belongsTo(models.Customers, {
      onDelete: 'CASCADE',
      foreignKey: 'customerId',
      targetKey: 'id'
    });
    models.Orders.hasMany(models.OrderDetails, { foreignKey: 'orderId' });
  };
  return Orders;
};
