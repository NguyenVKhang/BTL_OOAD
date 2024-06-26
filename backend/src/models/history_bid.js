const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const Product = require('./product');
const User = require('./user');

const BidHistory = sequelize.define('bid_history', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    amount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
    },
    winner_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
},
    {
        tableName: 'bid_history',
    }
);

BidHistory.belongsTo(Product, {foreignKey: "product_id"})
Product.hasMany(BidHistory, {foreignKey: "product_id"})

BidHistory.belongsTo(User, {foreignKey: "user_id"})
User.hasMany(BidHistory, {foreignKey: "user_id"})

module.exports = BidHistory;
