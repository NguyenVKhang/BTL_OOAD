const express = require('express')

const router = express.Router();
const myAccountController = require("../controllers/my_account")


router.post("/edit-profile", myAccountController.edit_profile);
router.post("/change-password", myAccountController.change_password);


module.exports = router;