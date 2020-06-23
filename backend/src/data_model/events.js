module.exports = (sequelize, DataTypes) => {
    const Events = sequelize.define("events", {
        name: {
            type: DataTypes.STRING
        },
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.TEXT
        },
        picture: {
            type: DataTypes.STRING
        },
        position: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.STRING,
            references: 'user',
            referencesKey: 'id'
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });

    return Events;
};