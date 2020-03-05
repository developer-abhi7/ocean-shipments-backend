'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shipment = sequelize.define('Shipment', {
    weight: DataTypes.INTEGER,
    volume: DataTypes.INTEGER,
    container_id: DataTypes.INTEGER
  }, {});
  Shipment.associate = function(models) {
    // associations can be defined here
    Shipment.belongsTo(models.Container, {
      foreignKey: 'container_id',
      as: 'container'
    });
  };
  return Shipment;
};