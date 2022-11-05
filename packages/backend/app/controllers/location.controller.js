const db = require("../models");
const Location = db.locations;

module.exports = {
    create : async (req, res, next) => {
        // id = req.params.id;
        const {name, state, country} = req.body;
    
        try{
            const location = new Location({name, state, country});

            location
                .save(location)
                .then(data => {
                res.send({status: true, data});
            });
       
        }catch(ex){
            next(ex);
        }
    },
    getLocations: async (req, res) => {
        try {
            const locations = await Location.find({});
            return res.json({status: true, locations});            
        } catch (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving locations."
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
                message: error.message || "Center not found."
            });
        }
    },
  
};