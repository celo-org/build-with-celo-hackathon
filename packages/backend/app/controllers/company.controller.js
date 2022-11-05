const db = require("../models");
const Requests = db.requests;

const Company = db.companies;

module.exports = {
  getCompanies: async (req, res) => {
    try {
        const companies = await Company.find({});
        return res.json({status: true, companies});            
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving Companies."
        });
    }
  },
  companyRequests: async (req, res) => {
    
    const { requestId } = req.params;
    try {
      const request = await Request.find({ company: requestId });
      res.send(request);
    } catch (error) {
      res
        .status(500)
        .send({ message: `Error retrieving company requests with id=${requestId}` });
    }
  },
  // companyRequests: (req, res) =>{
  //   const id = req.params.id;
  //   Requests.find({ company: id })
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving tutorials."
  //     });
  //   });
  // }
};

