const router = require('express').Router();

const requests = require('../controllers/request.controller');

router.post('/', requests.create);
router.get('/', requests.getRequests);
router.get('/:id', requests.getOneRequest);
router.put('/:id', requests.updateRequest);
router.delete('/:id', requests.deleteRequest);

module.exports = router;
