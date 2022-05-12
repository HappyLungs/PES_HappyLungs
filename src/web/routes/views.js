const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/", async (req, res) => {
    res.render("users");
});