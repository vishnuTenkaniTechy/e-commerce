const Items = require("../models/items");
const user = require("../models/user")
const cartItem = require('../models/cart')

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
                    id: itemCreated
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
exports.additemCart = ((req, res, next) => {
    Items.findOne({ _id: req.body.id }, (err, item) => {
        if (!item) {
            res.status(201).json({ message: "failed to find item id" })
        } else {
            const itemCart = new cartItem({
                itemName: req.body.itemName,
                itemImg: req.body.itemImg,
                itemPrice: req.body.itemPrice,
                itemDesc: req.body.itemDesc,
                itemNumber: req.body.itemNumber,
                itemCate: req.body.itemCate,
                itemQuantity: req.body.itemQuantity,
                itemtotal: req.body.itemtotal,
                itemCartUser: req.userData.userId,
                itemCartItem: req.body.id
            })
            itemCart.save().then((CartItem) => {
                res.status(201).json({
                    message: "Cart added successfully",
                    cart: {
                        ...CartItem,
                        id: cartItem._id,
                        Cartcount: cartItem.length,
                        userId: req.userData.userId
                    }

                });
            }).catch((err) => {
                ///sssssconsole.log(err);

                return res.status(401).json({
                    message: "Cart added failed"
                })
            })
        }
    })
})
exports.updateCart = ((req, res, next) => {
    const itemCart = new cartItem({
        _id: req.body.id,
        itemName: req.body.itemName,
        itemImg: req.body.itemImg,
        itemPrice: req.body.itemPrice,
        itemDesc: req.body.itemDesc,
        itemNumber: req.body.itemNumber,
        itemCate: req.body.itemCate,
        itemQuantity: req.body.itemQuantity,
        itemtotal: req.body.itemtotal,

    })
    cartItem.updateOne({ _id: req.params.id }, itemCart).then((updateCart) => {
        res.status(200).json({
            message: "updated item successfully",
            test: updateCart
        })
    }).catch((err) => {
        res.status(401).json({
            message: "Something went wrong!"
        })
    })
})
exports.deleteCartItem = ((req, res, next) => {
    cartItem.deleteOne({ _id: req.params.id }).then(result => {
        //console.log(result);
        res.status(200).json({ message: "item deleted!" });
    }).catch((err) => {
        res.status(401).json({ message: "Somethig went wrong!" });
    });
})

exports.getCartItem = ((req, res, next) => {
    cartItem.find().then(cartData => {
        res.status(200).json({
            message: 'Data Fetched Successfully',
            test: cartData,
            //userId: 
        })
    })
})
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
                    //1item.itemNumber = req.body.itemNumber;// Increment likes
                    //item.itemCart = req.body.itemCart;
                    //item.itemTotal = req.body.itemTotal;
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

                    //item.itemNumber = req.body.itemNumber;// Increment likes
                    //item.itemTotal = req.body.itemTotal;
                    //item.itemCart = req.body.itemCart;
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
exports.viewItemsById = ((req, res, next) => {
    Items.findOne({ _id: req.body.id }, (err, cartitem) => {
        if (!cartitem) {
            console.log(err);

            res.status(201).json({ message: "failed to find", cart: cartitem })
        } else {
            // cartItem.find( itemCartItem: cartitem._id , function(err, items) => {
            //     if (!items) {
            //         res.status(201).json({ message: "failed to find" })
            //     } else {
            //         res.status(200).json({ message: "fecthed items", item: items, err: err })
            //     }
            // })
            //res.json(cartitem)
            cartItem.find({ itemCartItem: cartitem._id })
                .then(ebooks => res.json(ebooks))
                .catch(err => res.status(404).json({ success: false }));

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

                //item.itemNumber = req.body.itemNumber;
                //item.itemTotal = req.body.itemTotal;
                //item.itemCart = req.body.itemCart;
                const arrayIndex = item.itemUser.indexOf(finduser._id); // Get the index of the username in the array for removal

                item.itemUser.splice(arrayIndex, 1);


                //    }
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

exports.addTocart = ((req, res, next) => {
    Items.findOne({ _id: req.body.id }), (err, item) => {
        if (!item) {
            res.status(201).json({ message: "faild to find" })
        } else {
            const cart = new cartItem({
                itemName: req.body.itemName,
                itemPrice: req.body.itemPrice,
                itemImg: req.body.itemImg,
                itemDesc: req.body.itemDesc,
                itemNumber: req.body.itemNumber,
                itemCate: req.body.itemCate,
                itemQuantity: req.body.itemQuantity,
                itemTotal: req.body.itemTotal,
                itemCartUser: req.userData.id,
                itemCartItem: item._id
            })
            cart.save().then((cartItem) => {
                res.status(200).json({
                    message: 'Cart Added',
                    cartItem: {
                        ...cartItem,
                        cartId: cartItem._id,
                        Cartcount: cartItem.length
                    }
                })
            })
        }
    }
})