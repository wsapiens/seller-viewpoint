'use strict';
module.exports = (sequelize, DataTypes) => {
  var OrderDetails = sequelize.define('OrderDetails', {
    quantity: DataTypes.INTEGER,
    discount: DataTypes.DECIMAL,
    amount: DataTypes.DECIMAL,
    returned: DataTypes.BOOLEAN,
    refund: DataTypes.BOOLEAN,
    order_id: {
      type: DataTypes.INTEGER,
      references: 'orders', // <<< Note, its table's name, not object name
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
    tableName: 'order_details'
  });
  OrderDetails.associate = function(models) {
    models.OrderDetails.belongsTo(models.Orders, {
      onDelete: 'CASCADE',
      foreignKey: 'order_id',
      targetKey: 'id'
    });
    models.OrderDetails.belongsTo(models.Products, {
      onDelete: 'CASCADE',
      foreignKey: 'product_id',
      targetKey: 'id'
    });
  };
  return OrderDetails;
};
