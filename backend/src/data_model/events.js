module.exports = (sequelize, DataTypes) => {
    const Events = sequelize.define("events", {
        name: {
            type: DataTypes.STRING
        },
        ID: {
            type: DataTypes.STRING
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
            referencesKey: 'ID'
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