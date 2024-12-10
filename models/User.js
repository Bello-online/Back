// models/User.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'customer'
      },
      salt:{
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        defaultValue: ''
      },
      phone:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      }
    });

    // Associations
  User.associate = (models) => {
    // One-to-Many: A user (business owner) can create many events
    User.hasMany(models.Event, {
      foreignKey: 'ownerId',
      as: 'ownedEvents',
      onDelete: 'CASCADE',
    });

    // Many-to-Many: A user (customer) can participate in many events
    User.hasMany(models.EventParticipant, {
      foreignKey: 'userId',
      as: 'participations',
      onDelete: 'CASCADE',
    });
  };
  
    return User;
  };
  