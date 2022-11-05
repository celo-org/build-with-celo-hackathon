const db = require("../models");
const Location = db.locations;

module.exports = {
    getLocations: async (req, res) => {
        try {
            const locations = await Location.find({});
            return res.json({status: true, locations});            
        } catch (error) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving locations."
            });
        }
    },
    getOneLocation: async (req, res) =>{
        const { id } = req.params;
        
        
        try{
            const location = await Location.findById(id);
            return res.json({status: true, location});
        }catch (error) {
            res.status(500).send({
                message: err.message || "Center not found."
            });
        }
    },
  
};