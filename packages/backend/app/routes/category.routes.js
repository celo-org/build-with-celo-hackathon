const router = require('express').Router();

const Category = require('../controllers/category.controller');

router.post('/', Category.create);
router.get('/', Category.getAllCategories);
router.get('/:id', Category.getOneCategory);
module.exports = router;
