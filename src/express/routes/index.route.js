const express = require("express");
const router = express.Router();
module.exports = router;

const UserController = require("./../controllers/user.controller");
const DataPointMap = require("./../controllers/dataPointMap.controller");
const Measure = require("./../controllers/measure.controller");

/*  User */
router.get(
    "/user",
    UserController.find
);

router.post(
    "/newUser",
    UserController.create
);
/* /User */

/*  DataPointMap  */
router.get(
    "/dataPointMap",
    DataPointMap.find
);
router.post(
    "/newDataPointMap",
    DataPointMap.create
);
/* /DataPointMap */

/*   Measure  */
router.get(
    "/measure",
    Measure.find
);
router.post(
    "/newMeasure",
    Measure.create
)
/*  /Measure  */