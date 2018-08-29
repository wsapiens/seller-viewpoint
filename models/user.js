'use strict';
module.exports = (sequelize, DataTypes) => {
  var User= sequelize.define('User', {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phone: DataTypes.STRING,
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    isManager: { type: DataTypes.BOOLEAN, defaultValue: false },
    companyId: {
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
    tableName: 'users'
  });

  User.associate = function (models) {
    models.User.belongsTo(models.Organization, {
      onDelete: 'CASCADE',
      foreignKey: 'organizationId'
    });
  };

  return User;
};