const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    sourceAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    destinationAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: Sequelize.STRING,
    amount: Sequelize.INTEGER,
    arrivalTime: Sequelize.DATE,
    totalPrice: Sequelize.INTEGER,
    productOwnerID: Sequelize.INTEGER
})

module.exports = Order;
