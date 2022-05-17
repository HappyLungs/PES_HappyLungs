const nodemailer = require('nodemailer');
require("dotenv").config;
const errorCodes = require("../helpers/errorCodes.js");

sendMail = (email, password) => {
  console.log("IT ARRIVED WITH MAIL: ", email)
  console.log("AND PASSWORD", password)

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
    text: ["Your password has been changed. Your new password is: ", password, ". Change your password as soon as possible."],
  };

  transporter.sendMail(mailOptions, function(err, success) {
    console.log("error is: ", err)
    if (err) {
      //return an error to response
      return errorCodes.METHOD_NOT_ALLOWED;
    } else {
      //return success code
      return errorCodes.SUCCESS;
    }
  });

}

module.exports = {sendMail};