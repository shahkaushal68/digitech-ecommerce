const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "kavadhruvik@gmail.com",
        pass: "diufalxnylqsjgmy",
    },
    tls: "tls",
});

module.exports = { transporter }