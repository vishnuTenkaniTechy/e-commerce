const mongose = require("mongoose");




const itemsSchema = mongose.Schema({
    itemName: { type: String, require: true, },
    itemImg: { type: String, require: true },
    itemPrice: { type: Number, required: true, },
    itemDesc: { type: String, required: true },
    itemAval: { type: Boolean, required: true },
    itemCate: { type: String, required: true }

})


module.exports = mongose.model("Items", itemsSchema);