const jwt = require('jsonwebtoken');
const { getUserByEmail, createNewUser } = require('../db/db');

const signupFunction = (req, res, next) => {
    createNewUser(req.body)
        .then((data) => {
            res.json({
                status: true,
                message: "User Created Successfully!"
            });
        })
        .catch((err) => {
            let message = "Something went wrong!";

            // Check for unique constraint error (duplicate email)
            if (err.code === "23505") {
                // 23505 = unique_violation in PostgreSQL
                if (err.constraint === "users_email_key") {
                    message = "Email already exists. Please use a different email.";
                }

                if (err.constraint === "phone_number") {
                    message = "Phone Number already exists. Please use a different phone number.";
                }
            }

            res.json({
                status: false,
                message,
            });
        });
};

const loginFunction = (req, res, next) => {
    getUserByEmail(req.body.email).then(result => {
        const token = jwt.sign({ email: req.body.email }, process.env.JWTKEY);
        res.json({
            status: true,
            data: result,
            token: token,
            message: "User logged in successfully"
        });
    }).catch(err => {
        // console.log('err=>', err)

        res.json({
            status: false,
            message: err.message || "Please enter valid email or password!"
        });
    })
}

module.exports = {
    signupFunction,
    loginFunction
}