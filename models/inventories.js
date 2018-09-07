'use strict';
module.exports = (sequelize, DataTypes) => {
  var Inventories = sequelize.define('Inventories', {
    quantity: DataTypes.INTEGER,
    organization_id: {
      type: DataTypes.INTEGER,
      references: 'organizations', // <<< Note, its table's name, not object name
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
    tableName: 'inventories'
  });
  Inventories.associate = function(models) {
    models.Expenses.belongsTo(models.Organizations, {
      onDelete: 'CASCADE',
      foreignKey: 'organization_id',
      targetKey: 'id'
    });
    models.Expenses.belongsTo(models.Products, {
      onDelete: 'CASCADE',
      foreignKey: 'product_id',
      targetKey: 'id'
    });
  };
  return Inventories;
};
