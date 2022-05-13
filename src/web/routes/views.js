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
router.get("/messages", async (req, res) => {
    //Implement
    res.render("messages");
});


//[POST] Block a user
router.post("/blockUser", async (req, res) => {
    const id = req.query.id;
    const page = req.query.page;
    await userCtrl.blockUser(id);
    res.redirect("/"+page);
});

//[POST] Unblock a user
router.post("/unblockUser", async (req, res) => {
    const id = req.query.id;
    const page = req.query.page;
    await userCtrl.unblockUser(id);
    res.redirect("/"+page);
});


//[POST] Accept report
router.post("/acceptReportedMessage", async (req, res) => {
    //Implement
    res.redirect("/reported");
});

//[POST] Decline report
router.post("/declineReportedMessage", async (req, res) => {
    //Implement
    res.redirect("/reported");
});