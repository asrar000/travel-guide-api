const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Attraction = sequelize.define('Attraction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    attractionName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    attractionSlug: {
        type: DataTypes.STRING,
        unique: true
    },
    additionalInfo: {
        type: DataTypes.TEXT
    },
    cancellationPolicy: {
        type: DataTypes.TEXT
    },
    images: {
        type: DataTypes.JSONB,
        defaultValue: []
    },
    price: {
        type: DataTypes.DECIMAL(10, 2)
    },
    currency: {
        type: DataTypes.STRING,
        defaultValue: 'USD'
    },
    whatsIncluded: {
        type: DataTypes.TEXT
    },
    country: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.DECIMAL(3, 1)
    },
    reviewsCount: {
        type: DataTypes.INTEGER
    },
    address: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'attractions',
    timestamps: true
});

module.exports = Attraction;