const nodemailer = require('nodemailer');
const sendResponseHelper = require("./sendResponse.helper");
require("dotenv").config;
const errorCodes = require("../helpers/errorCodes.js");

sendMail = (email, password) => {
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

  // CALL FUNCTION RESTORE PASSWORD

  let mailOptions = {
    from: "happylungsoficial@gmail.com>",
    to: email,
    subject: "Restore Password HappyLungs",
    text: ["Your password has been changed. Your new password is: ", password, ". Change your password as soon as possible."],
  };

  transporter.sendMail(mailOptions, function(err, success) {
    if (err) {
      //return an error to response
      sendResponseHelper.sendResponse(response, errorCodes.SYNTAX_ERROR, err, {});
    } else {
      //return success code
      sendResponseHelper.sendResponse(response, errorCodes.SUCCESS, "Success", {});
    }
  });

}

module.exports = {sendMail};