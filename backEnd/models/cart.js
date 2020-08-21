const mongose = require("mongoose");

const cartSchema = mongose.Schema({
    itemName: { type: String, require: true, },
    itemImg: { type: String, require: true },
    itemPrice: { type: Number, required: true, },
    itemDesc: { type: String, required: true },
    itemNumber: { type: Number, default: 0 },
    itemCate: { type: String, required: true },
    itemQuantity: { type: String, required: true },
    itemtotal: { type: Number },
    itemCartUser: { type: mongose.Schema.Types.ObjectId, ref: "User", required: true },
    itemCartItem: { type: mongose.Schema.Types.ObjectId, ref: "Items", required: true },
})

module.exports = mongose.model("cartItems", cartSchema);