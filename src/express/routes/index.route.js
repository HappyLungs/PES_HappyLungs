const express = require("express");
const router = express.Router();
module.exports = router;

const UserController = require("./../controllers/user.controller");

/*       USER     */

router.get(
    "/user",
    UserController.find
);

router.post(
    "/newUser",
    UserController.create
)

/*       /USER    */
