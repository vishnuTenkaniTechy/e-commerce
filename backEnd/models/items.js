const mongose = require("mongoose");




const itemsSchema = mongose.Schema({
    itemName: { type: String, require: true, },
    itemImg: { type: String, require: true },
    itemPrice: { type: Number, required: true, },
    itemDesc: { type: String, required: true },
    itemAval: { type: Boolean, required: true },
    itemCate: { type: String, required: true },
    itemQuantity: { type: String, required: true },
    itemUser: { type: Array },
    itemNumber: { type: Number, default: 1 },
    itemTotal: { type: Number, default: 0 },
    itemCart: { type: Boolean, default: false }


})


module.exports = mongose.model("Items", itemsSchema);