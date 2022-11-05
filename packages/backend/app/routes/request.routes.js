const router = require('express').Router();

const requests = require('../controllers/request.controller');

router.post('/', requests.create);
router.get('/', requests.getRequests);
router.get('/:id', requests.getOneRequest);
router.get('/:id/requests', requests.getCompanyRequests);
router.delete('/deleteAll', requests.deleteAll);
// router.put('/:id', requests.updateRequest);
// router.delete('/:id', requests.deleteRequest);

module.exports = router;
