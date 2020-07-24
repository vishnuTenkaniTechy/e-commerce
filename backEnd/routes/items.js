const express = require("express");
const Post = require("../models/items");
const router = express.Router();

const checkAuth = require("../middleware/check-auth")
const itemController = require("../controller/items")
const fileUpload = require("../middleware/file")

router.get("/api/item", itemController.getAllItems);

router.post("/api/item", checkAuth, fileUpload, itemController.addItems);

router.put("/api/item/:id", checkAuth, fileUpload, itemController.updateItem);
router.get("/api/item/:id", itemController.getItemById);
router.delete("/api/item/:id", checkAuth, itemController.deleteItem);
router.put("/api/increament/", checkAuth, itemController.increament);
router.put("/api/decreament/", checkAuth, itemController.decreament);

module.exports = router;