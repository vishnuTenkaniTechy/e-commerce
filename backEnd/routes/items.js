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
router.post("/api/itemcart", checkAuth, itemController.additemCart);
router.put("/api/updateItemcart/:id", checkAuth, itemController.updateCart);
router.delete("/api/deleteItemCart/:id", checkAuth, itemController.deleteCartItem);
router.get("/api/CartItem", checkAuth, itemController.getCartItem);
router.put("/api/viewCartItemById/", checkAuth, itemController.viewItemsById);
module.exports = router;