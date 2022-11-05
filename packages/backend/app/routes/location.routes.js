const Location = require("../controllers/location.controller.js");

var router = require("express").Router();

router.get("/", Location.getLocations);
router.get("/:id", Location.getOneLocation);


module.exports = router;