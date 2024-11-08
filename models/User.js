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
  
    return User;
  };
  