const express = require("express");
const router = express.Router();
const articlesController = require('../controllers/articles.controller')
router.post(
  "/",
  articlesController.post
  
);

module.exports = router;
