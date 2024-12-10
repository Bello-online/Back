'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventParticipant = sequelize.define(
    'EventParticipant',
    {
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Events', // Table name
          key: 'id',
        },
      },
      userId: {
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

  EventParticipant.associate = (models) => {
    // Many-to-One: A participant is associated with one event
    EventParticipant.belongsTo(models.Event, {
      foreignKey: 'eventId',
      as: 'event',
      onDelete: 'CASCADE',
    });

    // Many-to-One: A participant is associated with one user
    EventParticipant.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };

  return EventParticipant;
};
