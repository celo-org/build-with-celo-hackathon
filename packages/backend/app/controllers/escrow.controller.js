const db = require('../models');
const Escrow = db.escrows;
const Request = db.requests;
const Company = db.companies;

module.exports = {
    create: async (req, res) => {
        const {requestId, companyId } = req.body;
        try {
            /**
             * TODO: get request & company
            */
           const request = await Request.findById(requestId);
           const company = await Company.findById(companyId);
           if (!request || !company) {
            return res.status(500).send({
                message: `Company or request not found.`
            });
           }
           const newpayment = new Escrow({
                amount,
                amount_processed,
                amount_returned,
                fee,
                requestId,
                companyId
            });
            await newpayment.save();
        } catch (error) {
            
        }
    },

};