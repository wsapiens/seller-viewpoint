'use strict';
module.exports = (sequelize, DataTypes) => {
  var Organizations = sequelize.define('Organizations', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: true,
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
    models.Organizations.hasMany(models.Products, { foreignKey: 'organization_id' });
    models.Organizations.hasMany(models.Users, { foreignKey: 'organization_id' });
    models.Organizations.hasMany(models.Suppliers, { foreignKey: 'organization_id' });
    models.Organizations.hasMany(models.Purchases, { foreignKey: 'organization_id' });
    models.Organizations.hasMany(models.Orders, { foreignKey: 'organization_id' });
    models.Organizations.hasMany(models.Expenses, { foreignKey: 'organization_id' });
    models.Organizations.hasMany(models.Inventories, { foreignKey: 'organization_id' });
  };

  return Organizations;
};
