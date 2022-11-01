const requests = require("../controllers/request.controller.js");

var router = require("express").Router();

router.post("/", requests.create);
router.get("/", requests.getRequests);
router.get("/:id", requests.getOneRequest);


module.exports = router;