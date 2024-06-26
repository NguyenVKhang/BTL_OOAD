const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const ProductInvitationStatus = require("../../constants/product_invitation")
const Auction = require('./auction');
const Product = require('./product');
const Seller = require('./seller');


const InvitationProduct = sequelize.define('invitation_product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [ProductInvitationStatus.ACCEPTED, ProductInvitationStatus.DENIED, ProductInvitationStatus.NOT_YET],
        defaultValue: ProductInvitationStatus.NOT_YET,
    },
},
    {
        tableName: 'invitation_product',
    }
);

InvitationProduct.belongsTo(Seller, {foreignKey: "inviter_id"})
Seller.hasMany(InvitationProduct, {foreignKey: "inviter_id"})

InvitationProduct.belongsTo(Product, {foreignKey: "product_id"})
Product.hasMany(InvitationProduct, {foreignKey: "product_id"})

InvitationProduct.belongsTo(Auction, {foreignKey: "auction_id"})
Auction.hasMany(InvitationProduct, {foreignKey: "auction_id"})

module.exports = InvitationProduct;
