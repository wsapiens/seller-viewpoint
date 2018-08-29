'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    height: DataTypes.STRING,
    width: DataTypes.STRING,
    length: DataTypes.STRING,
    weight: DataTypes.STRING,
    upc: DataTypes.STRING,

    buyUnitPrice: DataTypes.DECIMAL(10, 2),
    sellUnitPrice: DataTypes.DECIMAL(10, 2),
    addOn: DataTypes.BOOLEAN,
    addOnToProductId: {
      type: DataTypes.INTEGER,
      references: 'product',
      referencesKey: 'id'
    },
    organizationId: {
      type: DataTypes.INTEGER,
      references: 'organization', // <<< Note, its table's name, not object name
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
    tableName: 'product'
  });

  Product.associate = function (models) {
    models.Product.belongsTo(models.Organization, {
      onDelete: 'CASCADE',
      foreignKey: 'organizationId',
      targetKey: 'id'
    });
  };

  return Product;
};
