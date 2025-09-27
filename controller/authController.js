const jwt = require('jsonwebtoken');
const { getUserByEmail, createNewUser, updatePassword } = require('../db/db');
const nodemailer = require("nodemailer");

const signupFunction = (req, res, next) => {
    createNewUser(req.body)
        .then((data) => {
            const token = jwt.sign({ email: req.body.email }, process.env.JWTKEY);
            res.json({
                status: true,
                token: token,
                data: data,
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

const sendResetMail = async (req, res, next) => {
    try {
        const { id, email, name } = req.user;

        // generate reset token (valid 15 min)
        const token = jwt.sign({ id: id, email: email }, process.env.JWTKEY, {
            expiresIn: "15m",
        });

        // reset link (pointing to your frontend or backend reset page)
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        // send email
        let transporter = nodemailer.createTransport({
            service: "gmail", // or smtp
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // console.log('transporter==>>', transporter)
        await transporter.sendMail({
            from: `"Hotel Inventory" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Reset your password",
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
                <h3 style="color: #2c3e50;">Hello ${name},</h3>
                <p>We received a request to reset your password for your <b>Hotel Inventory</b> account.</p>
                
                <p>Please click the button below to reset your password. 
                This link is valid for <b>15 minutes</b> only.</p>
                
                <a href="${resetLink}" 
                    style="display: inline-block; margin: 20px 0; padding: 12px 24px; 
                            background-color: #3498db; color: #fff; text-decoration: none; 
                            border-radius: 6px; font-weight: bold;">
                    Reset Password
                </a>
                
                <p>If you didn’t request a password reset, you can safely ignore this email. 
                Your password will remain unchanged.</p>
                
                <br/>
                <p>Best Regards,<br/>Hotel Inventory Team</p>
                </div>
            `,
        });

        res.json({ status: true, message: "Reset link sent to email" });
    } catch (err) {
        res.json({
            status: false,
            message: err.message || "Failed to send mail!"
        })
    }
}

const resetPassword = (req, res, next) => {
    updatePassword(req.body).then(data => {
        console.log('data==>>', data)
        // if(data){

        // }
        res.json({
            status: true,
            message: "Password updated successfully"
        })
    }).catch(err => {
        res.json({
            status: false,
            message: err.message || "Something went wrong!"
        })
    })
}

module.exports = {
    signupFunction,
    loginFunction,
    sendResetMail,
    resetPassword
}