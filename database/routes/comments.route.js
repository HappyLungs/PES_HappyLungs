const express = require("express");
const router = express.Router();
const commentsController = require('../controllers/comments.controller')
router.post(
  "/",
  commentsController.create
  
);

module.exports = router;
