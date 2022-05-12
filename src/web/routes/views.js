const express = require("express");
const router = express.Router();

module.exports = router;

//[GET] Main page
router.get("/", async (req, res) => {
    res.render("users", {page:"users"});
});

//[GET] All users
router.get("/users", async (req, res) => {
    res.render("users", {page:"users"});
});

//[GET] Blocked users
router.get("/blocked", async (req, res) => {
    res.render("users", {page:"blocked"});
});

//[PUT] Block a user
router.put("/blockUser/:userId", async (req, res) => {
    
});

//[PUT] Block a user
router.put("/unBlockUser/:userId", async (req, res) => {
    
});

//[GET] Reported messages of a blocked user
router.get("blocked/:userId", async (req, res) => {

});