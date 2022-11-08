const router = require('express').Router();

const requests = require('../controllers/request.controller');
const deliveries = require('../controllers/delivery.controller');

router.post('/', requests.create);
router.get('/', requests.getRequests);
router.get('/:id', requests.getOneRequest);
router.delete('/', requests.deleteAll);
router.get('/:id/deliveries', deliveries.getRequestDeliveries);

module.exports = router;
