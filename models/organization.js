'use strict';
module.exports = (sequelize, DataTypes) => {
  var Organization = sequelize.define('Organization', {
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
    tableName: 'organization'
  });

  Organization.associate = function(models) {
    models.Organization.hasMany(models.Product, { foreignKey: 'organizationId' });
    models.Organization.hasMany(models.User, { foreignKey: 'organizationId' });
  };

  return Organization;
};
