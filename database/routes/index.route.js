const express = require("express");
const router = express.Router();
module.exports = router;

//Middleware
const licenseMiddleware = require("../middlewares/license.middleware");
const authorizationMiddleware = require("../middlewares/authorization.middleware");

//Controllers
const UserController = require("../controllers/user.controller");
const MeasureStationController = require("../controllers/measureStation.controller");
const PollutantDayMeasureController = require("../controllers/pollutantDayMeasure.controller");
const PinController = require("../controllers/pin.controller");
const MessageController = require("../controllers/messages.controller");

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

<<<<<<< Updated upstream
router.put(
    "/changePassword",
    licenseMiddleware.validate,
    //authorizationMiddleware.validate,
    UserController.changePassword
=======
router.post(
    "/deleteUser",
    licenseMiddleware.validate,
    //authorizationMiddleware.validate,
    UserController.delete
>>>>>>> Stashed changes
);
/* /User */

/*  MeasureStation  */
router.get(
    "/measureStation",
    licenseMiddleware.validate,
    //authorizationMiddleware.validate,
    MeasureStationController.find
);
router.post(
    "/newMeasureStation",
    licenseMiddleware.validate,
    //authorizationMiddleware.validate,
    MeasureStationController.create
);
router.post(
    "/insertMultipleMeasureStation",
    licenseMiddleware.validate,
    //authorizationMiddleware.validate,
    MeasureStationController.insertMultiple
);
/* /MeasureStation */

/* PollutantDayMeasure */
router.get(
    "/pollutantDayMeasure",
    licenseMiddleware.validate,
    //authorizationMiddleware.validate,
    PollutantDayMeasureController.find
);
router.post(
    "/newPollutantDayMeasure",
    licenseMiddleware.validate,
    //authorizationMiddleware.validate,
    PollutantDayMeasureController.create
);
router.post(
    "/insertMultiplePollutantDayMeasure",
    licenseMiddleware.validate,
    PollutantDayMeasureController.insertMultiple
);
/* /PollutantDayMeasure */

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
/*  /Message */

router.post(
    "/message",
  //  licenseMiddleware.validate,

    MessageController.create
);
router.get(
    "/message",
    MessageController.find
);