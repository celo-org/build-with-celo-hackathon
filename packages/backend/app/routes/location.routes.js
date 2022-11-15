const router = require('express').Router();

const Location = require('../controllers/location.controller');

router.get('/', Location.getLocations);
router.post('/', Location.create);
router.get('/:id', Location.getOneLocation);

module.exports = router;
