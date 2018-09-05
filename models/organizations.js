'use strict';
module.exports = (sequelize, DataTypes) => {
  var Organizations = sequelize.define('Organizations', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    tableName: 'organizations'
  });

  Organizations.associate = function(models) {
    models.Organizations.hasMany(models.Products, { foreignKey: 'organizationId' });
    models.Organizations.hasMany(models.Users, { foreignKey: 'organizationId' });
    models.Organizations.hasMany(models.Suppliers, { foreignKey: 'organizationId' });
    models.Organizations.hasMany(models.Purchases, { foreignKey: 'organizationId' });
    models.Organizations.hasMany(models.Orders, { foreignKey: 'organizationId' });
    models.Organizations.hasMany(models.Expenses, { foreignKey: 'organizationId' });
    models.Organizations.hasMany(models.Inventories, { foreignKey: 'organizationId' });
  };

  return Organizations;
};
