const express = require("express");
const router = express.Router();
const commentsController = require('../controllers/comments.controller')
router.post(
  "/",
  commentsController.create
  
);

router.get(
    "/",
  commentsController.find
    );

module.exports = router;
