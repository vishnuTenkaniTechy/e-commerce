const express = require("express");
const router = express.Router();
const userControlller = require("../controller/user")
const fileUpload = require("../middleware/file")

//register
router.post("/register", fileUpload, userControlller.createUser)

router.post("/login", userControlller.loginUser)
module.exports = router; 