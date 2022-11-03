const db = require("../models");
const Request = db.requests;
const Location = db.locations;
const Company = db.companies;

module.exports = {
    create: async (req, res) => {
        const { scrap_category, scrap_subcategory, description, quantity_required, amount_per_unit, collection_center,
            company, location } = req.body;
            // const companyid = req.params.id
        try {


            /**
             * TODO: generate title 
             * todo: generate expiry date (and send in result)
             * todo: get location - from collection center
             * todo: get company
            */
            const EXPIRY_PERIOD = 30;
            let title = ``;
            // let company_find = Company.findById(companyid)
            /** 
             * todo: verify - collection center, scrap category and subcategory
             */
            // Create a request
            const request = new Request({
                title,
                description,
                scrap_category,
                scrap_subcategory,
                quantity_required,
                amount_per_unit,
                collection_center,
                company,
                location
            });
            // Save request in the database
            request
                .save(request)
                .then(data => {
                res.send(data);
            })
        } catch (error) {
            res.status(500).send({
                message: error.message || "Some errors occurred while creating the request."
            });
        }
    },
    getRequests: async (req, res) => {
        /**
         * TODO: paginate
        */
        const { filter, location, companyId } = req.query;
        let requests;
        try {
            // if filter query exists, run filter by param (maybe location)
            if (filter === 'location' && location) {
                // confirm that location exists, if not - pass error
                const foundlocation = await Location.findOne({ name: location }).exec();
                if (!foundlocation) {
                    return res.status(500).send({
                        message: `Location with name ${location} not found.`
                    });
                }
                /* location exists */
                requests = await Request.find({ location: foundlocation._id }).exec();
            } else if (filter === 'company' & companyId ) {
                // confirm that company exists, if not - pass error
                const foundcompany = await Company.findById(companyId).exec();
                if (!foundcompany) {
                    return res.status(500).send({
                        message: `Company with ID ${companyId} not found.`
                    });
                }
                /* company exists */
                requests = await Request.find({ company: foundcompany._id }).exec();
            } else {
                // get all requests
                requests = await Request.find().exec();
            }
            // no requests found
            if (!requests) {
                return res.status(404).send({
                    message: `No requests found for your query.`
                });
            }
            return res.send(requests);
        } catch (error) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving requests."
            });
        }
    },
    getOneRequest: async (req, res) => {
        /**
         * TODO: query TheGraph to get on-chain data
         * TODO: calculate total % provided (query deliveries collection)
         * TODO: calculate total amount paid (query deliveries + escrow payments collection)
         * TODO: calcaulte days remaining (query expiry date - today)
         *      ? use dayjs library
         * ? filter properties from the model file or here
        */
        const { requestId } = req.params;
        try {
            const request = await Request.findById(requestId);
            res.send(request);
        } catch (error) {
            res.status(500).send({ message: "Error retrieving request with id=" + id });
        }
    },
    updateRequest: async (req, res) => {
        if (!req.body) {
            return res.status(400).send({
              message: "Data to update can not be empty!"
            });
          }
        
          const id = req.params.id;
        
          Request.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(data => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update Request with id=${id}. Maybe Request was not found!`
                });
              } else res.send({ message: "Request was updated successfully." });
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating Request with id=" + id
              });
            });
    },
    deleteRequest: async (req, res) => {
    const id = req.params.id;
  
    Request.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Request with id=${id}. Maybe Request was not found!`
          });
        } else {
          res.send({
            message: "Request was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Request with id=" + id
        });
      });
  },
  
};