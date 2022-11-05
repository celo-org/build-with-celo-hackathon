const db = require("../models");
const CollectionCenter = db.collection_center;

module.exports = {
    create: async (req, res) => {
        const { title, address, phone_number, company, location } = req.body;
            
        try {
            const collection_center = new CollectionCenter({
                title, address, phone_number, company, location
            });
            
            collection_center
                .save(collection_center)
                .then(data => {
                res.send({status: true, data});
            })
        } catch (error) {
            res.status(500).send({
                message: error.message || "Some errors occurred while creating the collection center."
            });
        }
    },
    getOneCollectionCenter: async (req, res) =>{
        try{
            const collection_center = await CollectionCenter.findOne({ id: req.params.id }).populate('locations').populate('company');
            return res.json({status: true, collection_center});
        }catch (error) {
            res.status(500).send({
                message: err.message || "Center not found."
            });
        }
    },
    getCollectionCenters: async (req, res) =>{
        try {
            const collection_centers = await CollectionCenter.find({});
            return res.json({status: true, collection_centers});            
        } catch (error) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving locations."
            });
        }
    },
    getCompanyCollectionCenters: async (req, res) =>{
        // const id = req.params.id
        try {
            const collection_centers = await CollectionCenter.find({ company: req.params.id }).populate('location').populate('company');
            return res.json({status: true, collection_centers});            
        } catch (error) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving locations."
            });
        }
    },

    
    

}