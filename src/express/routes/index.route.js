const express = require("express");
const router = express.Router();
module.exports = router;

//Middleware
const licenseMiddleware = require("../middlewares/license.middleware");
const authorizationMiddleware = require("../middlewares/authorization.middleware");

//Controllers
const UserController = require("../controllers/user.controller");
const DataPointMap = require("../controllers/dataPointMap.controller");
const PollutantDayMeasure = require("../controllers/pollutantDayMeasure.controller");
const Measure = require("../controllers/measure.controller");

/*  User */
router.get(
    "/user",
    licenseMiddleware.validate,
    //authorizationMiddleware.validate,
    UserController.find
);

router.post(
    "/newUser",
    licenseMiddleware.validate,
    //authorizationMiddleware.validate,
    UserController.create
);
/* /User */

/*  DataPointMap  */
router.get(
    "/dataPointMap",
    licenseMiddleware.validate,
    //authorizationMiddleware.validate,
    DataPointMap.find
);
router.post(
    "/newDataPointMap",
    licenseMiddleware.validate,
    //authorizationMiddleware.validate,
    DataPointMap.create
);
/* /DataPointMap */

/* PollutantDayMeasure */
router.get(
    "/pollutantDayMeasure",
    licenseMiddleware.validate,
    //authorizationMiddleware.validate,
    PollutantDayMeasure.find
);
router.post(
    "/newPollutantDayMeasure",
    licenseMiddleware.validate,
    //authorizationMiddleware.validate,
    PollutantDayMeasure.create
);
/* /PollutantDayMeasure */

/*   Measure  */
router.get(
    "/measure",
    licenseMiddleware.validate,
    //authorizationMiddleware.validate,
    Measure.find
);
router.post(
    "/newMeasure",
    licenseMiddleware.validate,
    //authorizationMiddleware.validate,
    Measure.create
)
/*  /Measure  */