'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Event',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Table name
          key: 'id',
        },
      },
    },
    {}
  );

  Event.associate = (models) => {
    // One-to-Many: An owner (User) can own many events
    Event.belongsTo(models.User, {
      foreignKey: 'ownerId',
      as: 'owner',
      onDelete: 'CASCADE',
    });

    // One-to-Many: An event can have many participants
    Event.hasMany(models.EventParticipant, {
      foreignKey: 'eventId',
      as: 'participants',
      onDelete: 'CASCADE',
    });
  };

  return Event;
};
