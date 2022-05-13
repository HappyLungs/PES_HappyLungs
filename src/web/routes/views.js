const express = require("express");
const UserCtrl = require("../domain/controllers/UserCtrl");
const MessageCtrl = require("../domain/controllers/MessageCtrl");
const router = express.Router();
module.exports = router;

const userCtrl = new UserCtrl();
const messageCtrl = new MessageCtrl();

//[GET] Main page
router.get("/", async (req, res) => {
    try {
        let users = await userCtrl.fetchUsers("all");
        res.render("users", {page:"users", users:users});
        console.log("users: ", users);
    } catch (e) {
        res.render("users", {error:"Error: "+e.message});
    }
});

//[GET] All users
router.get("/users", async (req, res) => {
    let users = await userCtrl.fetchUsers("all");
    res.render("users", {page:"users", users:users});
});

//[GET] Reported users
router.get("/reported", async (req, res) => {
    let users = await userCtrl.fetchUsers("reported");
    res.render("users", {page:"reported", users:users});
});

//[GET] Blocked users
router.get("/blocked", async (req, res) => {
    let users = await userCtrl.fetchUsers("blocked");
    res.render("users", {page:"blocked", users:users});
});

//[GET] Reported messages
router.get("/messages", async (req, res) => {
    //Implement
    res.render("messages");
});


//[PUT] Block a user
router.put("/blockUser/:userId", async (req, res) => {
    const userId = req.userId;
    let { page } = req.body;
    if (!page) page = "blocked";
    await userCtrl.blockUser(userId);
    res.redirect("/"+page);
});

//[PUT] Block a user
router.put("/unblockUser/:userId", async (req, res) => {
    const userId = req.userId;
    let { page } = req.body;
    if (!page) page = "users";
    await userCtrl.unblockUser(userId);
    res.redirect("/"+page);
});


//[PUT] Accept report
router.put("/acceptReportedMessage", async (req, res) => {
    //Implement
    res.redirect("/reported");
});

//[PUT] Decline report
router.put("/declineReportedMessage", async (req, res) => {
    //Implement
    res.redirect("/reported");
});