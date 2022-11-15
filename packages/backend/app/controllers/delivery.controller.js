const db = require('../models');

const Request = db.requests;
const Delivery = db.deliveries;
const Collector = db.collectors;

module.exports = {
  getRequestDeliveries: async (req, res) => {
    const { id: requestId } = req.query;
    try {
      const request = await Request.findById(requestId).exec();
      if (!request) {
        return res.status(404).json({
          status: false,
          message: `Could not find request of ID ${requestId}`,
        });
      }
      const deliveries = await Delivery.find({ request: requestId }).populate({
        path: 'collector',
        model: Collector,
      });
      return res.json({ success: true, data: deliveries });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message:
          error.message ||
          `There was an error getting this request's deliveries`,
      });
    }
  },
  getDeliveryDetails: async () => {},
  startDelivery: async () => {},
};
