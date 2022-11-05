const CollectionCenter = require("../controllers/collectioncenter.controller.js");

var router = require("express").Router();

router.post("/", CollectionCenter.create);
router.get("/", CollectionCenter.getCollectionCenters);
router.get("/:id", CollectionCenter.getOneCollectionCenter);
router.get("/company/:id", CollectionCenter.getCompanyCollectionCenters);


module.exports = router;