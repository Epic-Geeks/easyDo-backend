"use strict";
require("dotenv").config();
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");

async function sendEmail(req, res, next) {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.EMAIL_PASSWORD}`
            }
        });

        const handlebarOptions = {
            viewEngine: {
                extName: ".handlebars",
                partialsDir: path.resolve("views"),
                defaultLayout: false
            },
            viewPath: path.resolve("views"),
            extName: ".handlebars"
        };

        transporter.use('compile', hbs(handlebarOptions));

        const { username, email } = req.userInfo;
        const mailOptions = {
            from: "epiceasydo@gmail.com",
            to: `${email}`,
            subject: `Hello ${username}`,
            template: 'email',
            context: {
                title: "Hey there!",
                name: username,
                location: "",
                price: "",
                service: "",
                providerName: "",
                tax: "",
                total:""
            }
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                res.send("Order placed successfully, we will send order details as soon posiable..!");
            } else {
                console.log("Email sent: " + info.response);
                res.status(201).send(req.orderDetails);
            }
        });
    } catch (error) {
        return next(error.message || error);
    }
}

module.exports = { sendEmail }