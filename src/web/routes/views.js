const express = require("express");
const UserCtrl = require("../domain/controllers/UserCtrl");
const router = express.Router();
module.exports = router;

const userCtrl = new UserCtrl();

//[GET] Main page
router.get("/", async (req, res) => {
    try {
        let users = userCtrl.fetchUsers("all");
        res.render("users", {page:"users", users:users});
        console.log("users: ", users);
    } catch (e) {
        res.render("users", {error:"Error: "+e.message});
    }
});

//[GET] All users
router.get("/users", async (req, res) => {
    let users = userCtrl.fetchUsers("all");
    res.render("users", {page:"users", users:users});
});

//[GET] Reported users
router.get("/reported", async (req, res) => {
    let users = userCtrl.fetchUsers("reported");
    res.render("users", {page:"reported", users:users});
});

//[GET] Blocked users
router.get("/blocked", async (req, res) => {
    let users = userCtrl.fetchUsers("blocked");
    res.render("users", {page:"blocked", users:users});
});

//[GET] Reported messages
router.get("blocked/:userId", async (req, res) => {

});



//[PUT] Block a user
router.put("/blockUser/:userId", async (req, res) => {
    const { page } = req.body;
    //put
    res.redirect("/"+page);
});

//[PUT] Block a user
router.put("/unBlockUser/:userId", async (req, res) => {
    const { page } = req.body;
    //put
    res.redirect("/"+page);
});

//[PUT] Accept report
router.put("/acceptReport/:userId/:messageId", async (req, res) => {
    //put
    res.redirect("/reported");
});

//[PUT] Decline report
router.put("/declineReport/:userId/:messageId", async (req, res) => {
    //put
    res.redirect("/reported");
});