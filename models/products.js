'use strict';
module.exports = (sequelize, DataTypes) => {
  var Products = sequelize.define('Products', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    height: DataTypes.STRING,
    width: DataTypes.STRING,
    length: DataTypes.STRING,
    weight: DataTypes.STRING,
    upc: DataTypes.STRING,
    unitPrice: DataTypes.DECIMAL(10, 2),
    addOn: DataTypes.BOOLEAN,
    addOnToProductId: {
      type: DataTypes.INTEGER,
      references: 'products',
      referencesKey: 'id'
    },
    organizationId: {
      type: DataTypes.INTEGER,
      references: 'organizations', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    }
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: true,
    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: false,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    tableName: 'products'
  });

  Products.associate = function (models) {
    models.Products.belongsTo(models.Organizations, {
      onDelete: 'CASCADE',
      foreignKey: 'organizationId',
      targetKey: 'id'
    });
    models.Products.hasMany(models.Purchases, { foreignKey: 'productId' });
    models.Products.hasMany(models.OrderDetails, { foreignKey: 'productId' });
    models.Products.hasMany(models.Expenses, { foreignKey: 'productId' });
    models.Products.hasMany(models.Inventories, { foreignKey: 'productId' });
  };

  return Products;
};
