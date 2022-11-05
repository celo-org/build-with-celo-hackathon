const Location = require("../controllers/location.controller.js");

var router = require("express").Router();

router.get("/", Location.getLocations);
router.post("/", Location.create);
router.get("/:id", Location.getOneLocation);


module.exports = router;