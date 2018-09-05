'use strict';
module.exports = (sequelize, DataTypes) => {
  var Suppliers = sequelize.define('Suppliers', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    contact: DataTypes.STRING,
    country: DataTypes.STRING,
    organizationId: {
      type: DataTypes.INTEGER,
      references: 'organizations', // <<< Note, its table's name, not object name
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
    tableName: 'suppliers'
  });
  Suppliers.associate = function(models) {
    models.Suppliers.belongsTo(models.Organizations, {
      onDelete: 'CASCADE',
      foreignKey: 'organizationId'
    });
    models.Suppliers.hasMany(models.Purchases, { foreignKey: 'supplierId' });
  };
  return Suppliers;
};
