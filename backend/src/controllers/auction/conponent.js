const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const logger = require('../../../conf/logger');
const sequelize = require('../../../conf/sequelize');
const AuctionProductStatus = require('../../../constants/auction_product_status')
const AuctionProductVisibilityStatus = require('../../../constants/product_visibility')
const statusCode = require('../../../constants/status');

const Auction = require('../../models/auction');
const Product = require('../../models/product');
const User = require('../../models/user');
const Seller = require('../../models/seller');
const Location = require('../../models/location');
const Admin = require('../../models/admin');
const Review = require('../../models/review');

const { PRODUCT_INCLUDE } = require('../product/conponent');


const AUCTION_INCLUDE = [
    {
        model: Seller,
        attributes: ['id', 'name'],
        include: [
            {
                model: Review
            }
        ]
    },
    {
        model: Product,
        include: PRODUCT_INCLUDE
    },
    {
        model: Location
    },
    {
        model: User,
    }
];


let get_auction = async (whereCondition, auctionIncludes = AUCTION_INCLUDE, kwargs = {}) => {
    try {
        let auctions = await Auction.findAll({
            where: whereCondition,
            include: auctionIncludes,
            ...kwargs,
        });

        logger.info(`Product length: ${auctions.length}`)
        return auctions;
    } catch (error) {
        logger.error(`Get product: ${error}`)
        throw new Error('Request timeout');
    }
}


let get_auction_by_pk = async (auction_id, whereCondition, auctionIncludes = AUCTION_INCLUDE, kwargs = {}) => {
    try {
        let auctions = await Auction.findByPk(auction_id, {
            where: whereCondition,
            include: auctionIncludes,
            ...kwargs,
        });

        logger.info(`Product length: ${auctions.length}`)
        return auctions;
    } catch (error) {
        logger.error(`Get product: ${error}`)
        throw new Error('Request timeout');
    }
}


module.exports = {
    AUCTION_INCLUDE,
    get_auction,
    get_auction_by_pk
}
