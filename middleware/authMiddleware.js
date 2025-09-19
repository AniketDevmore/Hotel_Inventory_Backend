const bcrypt = require('bcrypt');
const { getUserByEmail } = require('../db/db');

const encryptPassword = (req, res, next) => {
    const saltRound = 10;
    bcrypt.hash(req.body.password, saltRound, (err, hash) => {
        req.body.password = hash;
        // req.body.confirm = hash;
        next();
    });
}

const checkPassword = (req, res, next) => {
    // console.log('email=>', req.body)
    getUserByEmail(req.body.email).then(user => {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                console.log('err=>',err)
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

module.exports = {
    encryptPassword,
    checkPassword
}