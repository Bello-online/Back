'use strict';
module.exports = (sequelize, DataTypes) => {
  const Waitlist = sequelize.define('Waitlist', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    waitTime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id'
      }
    },
    address:{
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Waitlist.associate = (models) => {
    Waitlist.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
    Waitlist.hasMany(models.WaitlistCustomers, { foreignKey: 'waitlistId' });
  };

  return Waitlist;
};