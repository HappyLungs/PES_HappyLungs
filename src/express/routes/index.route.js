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
const PinController = require("../controllers/pin.controller");

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
router.post(
    "/insertMultipleDataPointMap",
    licenseMiddleware.validate,
    //authorizationMiddleware.validate,
    DataPointMap.insertMultiple
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
router.post(
    "/insertMultiplePollutantDayMeasure",
    licenseMiddleware.validate,
    PollutantDayMeasure.insertMultiple
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
);
router.post(
    "/insertMultipleMeasures",
    licenseMiddleware.validate,
    Measure.insertMultiple
);
/*  /Measure  */

/*  Pin */
router.post(
    "/newPin",
    licenseMiddleware.validate,
    PinController.create
);
router.get(
    "/pin",
    licenseMiddleware.validate,
    PinController.find
);
router.put(
    "/pin",
    licenseMiddleware.validate,
    PinController.validate("updatePin"),
    PinController.update
);
/*  /Pin */