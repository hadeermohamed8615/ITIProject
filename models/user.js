const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Type: {
        type: Sequelize.ENUM,
        values: ['user', 'admin', 'shop' , 'Shipping'],
        defaultValue: 'user',
        allowNull: false
    },
    fName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: Sequelize.STRING,
    phone: Sequelize.INTEGER,
    DOB: Sequelize.INTEGER
})

// (async () => {
//     await sequelize.sync({ force: true });
//     // Code here
//   })();


module.exports = User;