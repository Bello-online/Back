module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'Users', // Name of the related table
              key: 'id'
          }
      },
      waitlistId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'Waitlists', // Name of the related table
              key: 'id'
          }
      },
      message: {
          type: DataTypes.STRING,
          allowNull: false
      },
      isRead: {
          type: DataTypes.BOOLEAN,
          defaultValue: false // Mark as unread by default
      }
  });
  
  // Define associations, if needed
  Notification.associate = models => {
      Notification.belongsTo(models.User, { foreignKey: 'userId' });
      Notification.belongsTo(models.Waitlist, { foreignKey: 'waitlistId' });
  };

  return Notification;
};