const Items = require("../models/items");
const user = require("../models/user")


exports.addItems = ((req, res, next) => {

    let Loggeduser;
    user.findOne({ _id: req.userData.userId }, (err, finduser) => {
        Loggeduser = finduser;
        const url = req.protocol + '://' + req.get("host");
        const item = new Items({
            itemName: req.body.itemName,
            itemImg: url + '/images/' + req.file.filename,
            itemPrice: req.body.itemPrice,
            itemDesc: req.body.itemDesc,
            itemAval: req.body.itemAval,
            itemCate: req.body.itemCate,
            itemQuantity: req.body.itemQuantity,
            itemTotal: req.body.itemTotal
        })
        item.save().then((itemCreated) => {
            res.status(201).json({
                message: "item added successfully",
                item: {
                    ...itemCreated,
                    id: itemCreated._id
                }

            });
        }).catch((err) => {
            return res.status(401).json({
                message: "Invalid login"
            })
        })
    })
})

exports.updateItem = ((req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + '/images/' + req.file.filename
    }

    const item = new Items({
        _id: req.body.id,
        itemName: req.body.itemName,
        itemImg: imagePath,
        itemPrice: req.body.itemPrice,
        itemDesc: req.body.itemDesc,
        itemAval: req.body.itemAval,
        itemCate: req.body.itemCate,
        itemQuantity: req.body.itemQuantity,
        itemNumber: req.body.itemNumber,
        itemTotal: req.body.itemTotal
    })
    Items.updateOne({ _id: req.params.id }, item).then(() => {
        res.status(200).json({
            message: "updated item successfully"
        })
    }).catch((err) => {
        res.status(401).json({
            message: "Something went wrong!"
        })
    })
})


exports.deleteItem = ((req, res, next) => {
    Items.deleteOne({ _id: req.params.id }).then(result => {
        //console.log(result);
        res.status(200).json({ message: "item deleted!" });
    }).catch((err) => {
        res.status(401).json({ message: "Somethig went wrong!" });
    });
})


exports.getAllItems = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const Currentpage = +req.query.page;
    const postQuery = Items.find();
    let fetchedPost;
    if (pageSize && Currentpage) {
        postQuery.skip(pageSize * (Currentpage - 1))
            .limit(pageSize);
    }
    postQuery.then(documents => {
        fetchedPost = documents
        return Items.count()
    }).then(count => {
        res.status(200).json({
            message: "Posts fetched successfully!",
            post: fetchedPost,
            maxPosts: count
        });
    });
}

exports.increament = ((req, res, next) => {
    Items.findOne({ _id: req.body.id }, (err, item) => {
        if (!item) {
            console.log(item);
            res.status(201).json({ message: "faild to find item id" })
        } else {
            user.findOne({ _id: req.userData.userId }, (err, finduser) => {
                if (item.itemUser.includes(finduser._id)) {
                    const arrayIndex = item.itemUser.indexOf(finduser._id); // Get the index of the username in the array for removal
                    item.itemUser.splice(arrayIndex, 1); // Remove user from array
                    item.itemNumber = req.body.itemNumber;// Increment likes
                    item.itemCart = req.body.itemCart;
                    item.itemTotal = req.body.itemTotal;
                    item.itemUser.push(finduser._id); // Add username to the array of likedBy array
                    // Save blog post data
                    item.save((err) => {
                        // Check if error was found
                        if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                        } else {
                            res.json({ success: true, message: 'item addedtocart' }); // Return success message
                        }
                    });

                } else {
                    //item.itemNumber++;
                    //console.log(item);

                    item.itemNumber = req.body.itemNumber;// Increment likes
                    item.itemTotal = req.body.itemTotal;
                    item.itemCart = req.body.itemCart;
                    item.itemUser.push(finduser._id);
                    item.save((err) => {
                        console.log(err);

                        if (err) {
                            res.status(201).json({ message: "add to cart failed" })
                        } else {
                            res.status(200).json({ message: "add to cart successFully" })

                        }
                    });

                }
            })

        }

    })
})

exports.getItemById = ((req, res, next) => {
    Items.findById(req.params.id).then((fectchItem) => {
        if (fectchItem) {
            res.status(200).json(fectchItem);
        } else {
            res.status(404).json({ message: "item not found!" });
        }
    })
})

exports.decreament = ((req, res, next) => {
    Items.findOne({ _id: req.body.id }, (err, item) => {
        if (!item) {
            res.status(201).json({ message: "faild to find id" })
        } else {
            user.findOne({ _id: req.userData.userId }, (err, finduser) => {
                //if (finduser._id === req.userData.userId) {
                item.itemNumber = req.body.itemNumber;
                item.itemTotal = req.body.itemTotal;
                if (item.itemNumber < 2) {
                    item.itemNumber = req.body.itemNumber;
                    item.itemTotal = req.body.itemTotal;
                    item.itemCart = req.body.itemCart;
                    const arrayIndex = item.itemUser.indexOf(finduser._id); // Get the index of the username in the array for removal

                    item.itemUser.splice(arrayIndex, 1);


                }
                item.save((err) => {
                    if (!err) {
                        res.status(200).json({ message: 'removed item cart' })
                    } else {
                        res.status(201).json({ message: 'removed item cart failed' })
                    }
                })
                //}

            })
        }
    })
})