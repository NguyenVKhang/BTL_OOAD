const express = require('express')

const router = express.Router();
const auctionController = require('../controllers/auction')


router.post("/create", auctionController.create_auction);


module.exports = router;
