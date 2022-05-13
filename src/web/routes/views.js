const express = require("express");
const UserCtrl = require("../domain/controllers/UserCtrl");
const router = express.Router();
module.exports = router;

const userCtrl = new UserCtrl();

//[GET] Main page
router.get("/", async (req, res) => {
    try {
        let users = await userCtrl.fetchUsers("all");
        res.render("users", {page:"users", users:users});
    } catch (e) {
        res.render("users", {error:"Error: "+e.message});
    }
});

//[GET] All users
router.get("/users", async (req, res) => {
    try {
        let users = await userCtrl.fetchUsers("all");
        res.render("users", {page:"users", users:users});
    } catch (e) {
        res.render("users", {error:"Error: "+e.message});
    }
});

//[GET] Reported users
router.get("/reported", async (req, res) => {
    try {
        let users = await userCtrl.fetchUsers("reported");
        res.render("users", {page:"reported", users:users});
    } catch (e) {
        res.render("users", {error:"Error: "+e.message});
    }
});

//[GET] Blocked users
router.get("/blocked", async (req, res) => {
    try {
        let users = await userCtrl.fetchUsers("blocked");
        res.render("users", {page:"blocked", users:users});
    } catch (e) {
        res.render("users", {error:"Error: "+e.message});
    }
});

//[GET] Reported messages
router.get("/messages/:id", async (req, res) => {
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
router.put("/acceptReport/:messageId", async (req, res) => {
    const messageId = req.messageId;
    await userCtrl.acceptReport(messageId);
    res.redirect("/reported");
});

//[PUT] Decline report
router.put("/declineReport/:messageId", async (req, res) => {
    const messageId = req.messageId;
    await userCtrl.declineReport(messageId);
    res.redirect("/reported");
});