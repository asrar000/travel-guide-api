const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Flight = sequelize.define('Flight', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    flightName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    departureAirport: {
        type: DataTypes.STRING,
        allowNull: false
    },
    arrivalAirport: {
        type: DataTypes.STRING,
        allowNull: false
    },
    departureTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    flightLogo: {
        type: DataTypes.STRING
    },
    fare: {
        type: DataTypes.DECIMAL(10, 2)
    },
    currency: {
        type: DataTypes.STRING,
        defaultValue: 'USD'
    },
    location: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    flightToken: {
        type: DataTypes.STRING,
        unique: true
    },
    duration: {
        type: DataTypes.STRING
    },
    stops: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'flights',
    timestamps: true
});

module.exports = Flight;