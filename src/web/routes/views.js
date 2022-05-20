const express = require("express");
const UserCtrl = require("../domain/controllers/UserCtrl");
const MessageCtrl = require("../domain/controllers/MessageCtrl");
const AuthMiddleware = require("./auth_middleware");
const jwt = require("jsonwebtoken");
const router = express.Router();
module.exports = router;

const userCtrl = new UserCtrl();
const messageCtrl = new MessageCtrl();
const auth = new AuthMiddleware();

//[GET] Main page
router.get("/", auth.passthrough, async (req, res) => {
    const user = req.user_auth;
    if (user == null) {
        res.redirect("/login");
    }
    else {
        try {
            let users = await userCtrl.fetchUsers("all");
            res.render("users", {page:"users", users:users});
        } catch (e) {
            res.render("users", {error:"Error: "+e.message});
        }
    }
});

//[GET] Admin login
router.get("/login", async (req, res) => {
    if (req.cookies.access_token) res.clearCookie("access_token");;
    try {
        res.render("login", {page:"login"});
    } catch (e) {
        res.render("login", {error:"Error: "+e.message});
    }
});

//[POST] Admin login
router.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body;
        if (!username || !password || username !== "admin" || password !== "admin") {
            res.redirect("/login?err=error");
            return;
        }
        let token = jwt.sign({username:username}, process.env.USER_AUTH_SECRET_KEY, {expiresIn:"5h"});
        res.cookie("access_token", token);
        res.redirect("/");
    } catch (e) {
        res.render("login", {error:"Error: "+e.message});
    }
});

//[GET] Admin logout
router.get("/logout", async (req, res) => {
    try {
        res.redirect("login");
    } catch (e) {
        res.render("logout", {error:"Error: "+e.message});
    }
});

//[GET] All users
router.get("/users", auth.strict, async (req, res) => {
    try {
        let users = await userCtrl.fetchUsers("all");
        res.render("users", {page:"users", users:users});
    } catch (e) {
        res.render("users", {error:"Error: "+e.message});
    }
});

//[GET] Reported users
router.get("/reported", auth.strict, async (req, res) => {
    try {
        let users = await userCtrl.fetchUsers("reported");
        res.render("users", {page:"reported", users:users});
    } catch (e) {
        res.render("users", {error:"Error: "+e.message});
    }
});

//[GET] Blocked users
router.get("/blocked", auth.strict, async (req, res) => {
    try {
        let users = await userCtrl.fetchUsers("blocked");
        res.render("users", {page:"blocked", users:users});
    } catch (e) {
        res.render("users", {error:"Error: "+e.message});
    }
});

//[GET] Reported messages
router.get("/messages", auth.strict, async (req, res) => {
    try {
        const id = req.query.id;
        let data = await messageCtrl.fetchMessages(id);
        res.render("messages", {messages:data.messages, user:data.user});
    } catch (e) {
        res.render("messages", {error:"Error: "+e.message});
    }
});


//[POST] Block a user
router.post("/blockUser", auth.strict, async (req, res) => {
    const id = req.query.id;
    const page = req.query.page;
    await userCtrl.blockUser(id);
    res.redirect("/"+page);
});

//[POST] Unblock a user
router.post("/unblockUser", auth.strict, async (req, res) => {
    const id = req.query.id;
    const page = req.query.page;
    await userCtrl.unblockUser(id);
    res.redirect("/"+page);
});


//[POST] Accept report
router.post("/acceptReportedMessage", auth.strict, async (req, res) => {
    const id = req.query.id;
    const email = req.query.email;
    await messageCtrl.acceptReportedMessage(id);
    res.redirect("/messages?id="+email);
});

//[POST] Decline report
router.post("/declineReportedMessage", auth.strict, async (req, res) => {
    const id = req.query.id;
    const email = req.query.email;
    await messageCtrl.declineReportedMessage(id);
    res.redirect("/messages?id="+email);
});

//[POST] Decline report
router.post("/editReportedMessage", auth.strict, async (req, res) => {
    const id = req.query.id;
    const email = req.query.email;
    await messageCtrl.editReportedMessage(id);
    res.redirect("/messages?id="+email);
});