const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByEmail, getUserById } = require('../db/db');

const encryptPassword = (req, res, next) => {
    const saltRound = 10;

    if (req.body.password !== req.body.confirm) {
        return res.json({ status: false, message: "Passwords do not match!" });
    }

    bcrypt.hash(req.body.password, saltRound, (err, hash) => {
        req.body.password = hash;
        req.body.confirm = hash;
        next();
    });
}

const checkPassword = (req, res, next) => {
    // console.log('email=>', req.body)
    getUserByEmail(req.body.email).then(user => {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                console.log('err=>', err)
                return res.json({
                    status: false,
                    message: "Something went wrong while checking password"
                });
            }

            if (!result) {
                return res.json({
                    status: false,
                    message: "Please enter a valid password"
                });
            }
            next();
        })
    }).catch(err => {
        // console.log('err1=>', err)
        return res.json({
            status: false,
            message: err.message || "User not found"
        });
    })
}

const varifyUser = (req, res, next) => {
    getUserById(req.body).then(data => {
        req.user = data;
        next();
    }).catch(err => {
        return res.json({
            status: false,
            message: err.message || "User not found"
        });
    })
}

const verifyResetToken = (req, res, next) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWTKEY);
        if (decoded) {
            req.body.id = decoded.id;
            next();
        }
    } catch (err) {
        return res.json({
            status: false,
            message: err.message || "Something went wrong!"
        })
    }
}

module.exports = {
    encryptPassword,
    checkPassword,
    varifyUser,
    verifyResetToken
}