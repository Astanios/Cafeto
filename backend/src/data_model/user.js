module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        ID: {
            type: Sequelize.STRING
        }
    });

    return User;
};