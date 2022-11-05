const router = require('express').Router();

const company = require('../controllers/company.controller');

// Create a new Company
router.get('/', company.getCompanies);
router.get('/:id/requests', company.companyRequests);

// Retrieve all Tutorials
// router.get("/", company.findAll);

// Retrieve all published Tutorials
// router.get('/requests', company.companyRequests);

// Retrieve a single Tutorial with id
// router.get("/:id", company.findOne);

// Update a Tutorial with id
// router.put("/:id", company.update);

// Delete a Tutorial with id
// router.delete("/:id", company.delete);

// Create a new Tutorial
// router.delete("/", company.deleteAll);

module.exports = router;
