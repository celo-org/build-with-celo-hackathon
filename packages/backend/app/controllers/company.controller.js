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
  getOneCompany: async (req, res) => {
    const id = req.params.id;

    try {
      console.log(id);
        const company = await Company.findOne({ id: id });
        return res.json({status: true, company});            
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving Companies."
        });
    }
  },
  companyRequests: async (req, res) => {
    
    // const { requestId } = req.params.id;
    // console.log(req.params.id)
    try {
      const request = await Requests.find({ company: req.params.id });
      res.send(request);
    } catch (error) {
      res
        .status(500)
        .send({ message: `Error retrieving company requests` });
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

