module.exports = (sequelize, DataTypes) => {
    const WaitlistCustomers = sequelize.define('WaitlistCustomers', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      waitlistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Waitlists',  
            key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',  
            key: 'id',
        },
      },
    });
    WaitlistCustomers.associate = (models) => {
      WaitlistCustomers.belongsTo(models.Waitlist, { foreignKey: 'waitlistId' });
      WaitlistCustomers.belongsTo(models.User, { foreignKey: 'userId' });
  };
  
    return WaitlistCustomers;
  };
  