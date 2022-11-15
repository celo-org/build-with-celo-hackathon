const router = require('express').Router();
const CollectionCenter = require('../controllers/collectioncenter.controller');

router.post('/', CollectionCenter.create);
router.get('/', CollectionCenter.getCollectionCenters);
router.get('/:id', CollectionCenter.getOneCollectionCenter);
router.get('/companies/:id', CollectionCenter.getCompanyCollectionCenters);

module.exports = router;
