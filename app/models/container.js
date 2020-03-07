'use strict';
module.exports = (sequelize, DataTypes) => {
  const Container = sequelize.define('Container', {
    status: DataTypes.STRING,
    volume_limit: DataTypes.INTEGER,
    weight_limit: DataTypes.INTEGER,
    volume_filled: DataTypes.INTEGER,
    weight_filled: DataTypes.INTEGER
  }, {});
  Container.associate = function(models) {
    // associations can be defined here
    Container.hasMany(models.Shipment, {
      foreignKey: 'container_id',
      as: 'shipments',
    });
  };
  return Container;
};