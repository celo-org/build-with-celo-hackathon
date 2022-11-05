const db = require("../models");
const companies = db.companies;
const requests = db.requests;

// Signup as a new Company
exports.signup = (req, res) => {


}


// Requests from a new Company

exports.companyRequests = (req, res) =>{
    const id = req.params.id;
    requests.find({ company: id })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}

exports.companyProfile = (req, res) =>{
    
}
