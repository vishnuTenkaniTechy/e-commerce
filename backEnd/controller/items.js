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
            itemQuantity: req.body.itemQuantity
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
        itemCate: req.body.itemCate
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