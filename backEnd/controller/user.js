const bycrpt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../models/user")

exports.createUser = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + '/images/' + req.file.filename
    }
    //const url = req.protocol + '://' + req.get("host");
    bycrpt.hash(req.body.password, 8).then((hash) => {
        //console.log(hash)

        const user = new User({
            userName: req.body.userName,
            profileImg: imagePath,
            email: req.body.email,
            role: req.body.role,
            password: hash
        })
        user.save().then((result) => {
            console.log(result);

            res.status(201).json({
                message: "User created!",
                result: result
            })
        }).catch((err) => {
            console.log(err);

            res.status(501).json({
                message: "Email id already exists!",
            })
        })
    }).catch((err) => {
        console.log(err);
        res.status(501).json({
            message: "Failed to register!",
        })
    })
}

exports.loginUser = (req, res, next) => {
    let fectchedUser;
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            return res.status(401).json({
                message: "Invalid login"
            })
        }
        fectchedUser = user;
        return bycrpt.compare(req.body.password, user.password)

    }).then((result) => {
        if (!result) {
            return res.status(401).json({
                message: "Invalid login"
            })
        }
        const token = jwt.sign({ email: fectchedUser.email, userId: fectchedUser._id }, "seceret_web_token_should_be_loger",
            { expiresIn: "1h" });
        res.status(200).json({
            message: "Auth successfuly!",
            token: token,
            expiresIn: 3600,
            userId: fectchedUser._id,
            userDetails: fectchedUser
        })
    }).catch((err) => {
        return res.status(401).json({
            message: "items added failed"
        })
    });

}