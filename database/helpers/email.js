const nodemailer = require('nodemailer');
require("dotenv").config;
const errorCodes = require("../helpers/errorCodes.js");

exports.sendMail = async (email, password) => {

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "happylungsoficial@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    }
  });

  let mailOptions = {
    from: "happylungsoficial@gmail.com>",
    to: email,
    subject: "Restore Password HappyLungs",
    text: "Your password has been changed. Your new password is: " + password + "\n\n Change your password as soon as possible.",
  };

  return await transporter.sendMail(mailOptions);

}