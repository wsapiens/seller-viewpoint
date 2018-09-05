'use strict';
module.exports = (sequelize, DataTypes) => {
  var Customers = sequelize.define('Customers', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    street1: DataTypes.STRING,
    street2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
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
    tableName: 'customers'
  });
  Customers.associate = function(models) {
    models.Customers.belongsTo(models.Organizations, {
      onDelete: 'CASCADE',
      foreignKey: 'organizationId',
      targetKey: 'id'
    });
    models.Customers.hasMany(models.Orders, { foreignKey: 'customerId' });
  };
  return Customers;
};
