const nodemailer = require('nodemailer');
require("dotenv").config;
const errorCodes = require("../helpers/errorCodes.js");

sendMail = async (email, password) => {

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

  await transporter.sendMail(mailOptions, function(err, success) {
    console.log("ERROR: ", err)
    console.log("Success: ", success)
    if (err) {
      //return an error to response
      console.log("ERROR: ", err)
      return errorCodes.METHOD_NOT_ALLOWED;
    } else {
      //return success code
      console.log("Success: ", success)
      return errorCodes.SUCCESS;
    }
  });

}

module.exports = {sendMail};