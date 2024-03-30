const express = require('express')

const router = express.Router();
const locationController = require("../controllers/location")


router.get("/id=:location_id", locationController.get_location);


module.exports = router;
