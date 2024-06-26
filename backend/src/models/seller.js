const { DataTypes} = require('sequelize');

const sequelize = require('../../conf/sequelize');
const SellerStatus = require('../../constants/seller_status')
const User = require('./user');
const Location = require('./location');

const Seller = sequelize.define('seller', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Seller"
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desciption: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [SellerStatus.ACCEPTED, SellerStatus.PROCESSING, SellerStatus.DENIED],
        defaultValue: SellerStatus.PROCESSING,
    },
},
    {
        tableName: 'seller',
    }
);

Seller.hasOne(User, {foreignKey: "seller_id"})
User.hasOne(Seller, {foreignKey: "user_id"})

Seller.belongsTo(Location, {foreignKey: "location_id"});
Location.hasMany(Seller, {foreignKey: "location_id"});

module.exports = Seller;
