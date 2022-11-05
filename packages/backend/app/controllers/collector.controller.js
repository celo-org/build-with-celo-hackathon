const db = require("../models");
const Requests = db.requests;
const Location = db.locations;
const Collectors = db.collectors;

module.exports = {
  getOneCollector: async (req, res) => {
    const id = req.params.id;
    try{
        const collector = await Collectors.findById(id).populate({ path: 'location', model: Location });
        return res.json({status: true, collector});
    }catch (error) {
        res.status(500).send({
            message: error.message || "Center not found."
        });
    }
  },
  getCollectors: async (req, res) => {
    try {
            const collectors = await Collectors.find({}).populate({ path: 'location', model: Location });
            return res.json({status: true, collectors});  
                  
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving Collectors."
        });
    }
  }
};

