const db = require('../models');

const Location = db.locations;
const Company = db.companies;
const CollectionCenter = db.collectioncenter;

module.exports = {
  create: async (req, res) => {
    const { title, address, phone_number, company, location } = req.body;

    try {
      // console.log(req.body)

      // if(req.body.length > 0){
      let collection_center = new CollectionCenter({
        title,
        address,
        phone_number,
        company,
        location,
      });

      collection_center = await collection_center.save(collection_center);
      return res.send({ status: true, data: collection_center });
      // }else{
      //     return res.json({status: false, message: 'Some errors occurred while creating the collection center.'});

      // }
    } catch (error) {
      return res.status(500).send({
        message:
          error.message ||
          'Some errors occurred while creating the collection center.',
      });
    }
  },
  getOneCollectionCenter: async (req, res) => {
    try {
      const collection_center = await CollectionCenter.findOne({
        id: req.params.id,
      })
        .populate({ path: 'location', model: Location })
        .populate({ path: 'company', model: Company });
      return res.json({ status: true, collection_center });
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'Center not found.',
      });
    }
  },
  getCollectionCenters: async (req, res) => {
    try {
      const collection_centers = await CollectionCenter.find({})
        .populate({ path: 'location', model: Location })
        .populate({ path: 'company', model: Company });
      return res.json({ status: true, collection_centers });
    } catch (error) {
      return res.status(500).send({
        message:
          error.message || 'Some error occurred while retrieving locations.',
      });
    }
  },
  getCompanyCollectionCenters: async (req, res) => {
    // const id = req.params.id
    try {
      const collection_centers = await CollectionCenter.find({
        company: req.params.id,
      })
        .populate({ path: 'location', model: Location })
        .populate({ path: 'company', model: Company });
      return res.json({ status: true, collection_centers });
    } catch (error) {
      return res.status(500).send({
        message:
          error.message || 'Some error occurred while retrieving locations.',
      });
    }
  },
};
