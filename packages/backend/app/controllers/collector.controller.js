const db = require('../models');

const Requests = db.requests;
const Location = db.locations;
const Collectors = db.collectors;

module.exports = {
  register: async (req, res) => {
    try {

      const { name, email, phone, wallet_address } = req.body;
      let location = "6367f57ad6f4b58b9dfc61f1";
      const usercheck = await Collectors.findOne({ email }).populate({ path: 'location', model: Location });
      if (usercheck)
        return res.json({ msg: "Email already exists", status: false });

      const locationcheck = await Location.findById(location);
      if (!locationcheck)
        return res.json({ msg: "Location does not exist", status: false });

      let user = new Collectors({
        name,
        email,
        phone,
        wallet_address,
        location
      });
      // Save request in the database
      user = user.save(user);
      return res.send({ status: true, data: user, msg: "Successfully registered" });
    } catch (ex) {
      next(ex);
    }
  },
  login: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Collectors.findOne({ email }).populate({ path: 'location', model: Location });
      if (!user)
        return res.json({ msg: "Incorrect Email", status: false });
      return res.json({ status: true, user, msg: "Logged In Successfully" });
    } catch (ex) {
      next(ex);
    }
  },
  getOneCollector: async (req, res) => {
    const { id } = req.params;
    try {
      const collector = await Collectors.findById(id).populate({
        path: 'location',
        model: Location,
      });
      return res.json({ status: true, data: collector });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: error.message || 'Collector not found.',
      });
    }
  },
  getCollectors: async (req, res) => {
    try {
      const collectors = await Collectors.find({}).populate({
        path: 'location',
        model: Location,
      });
      return res.json({ status: true, data: collectors });
    } catch (error) {
      return res.status(500).send({
        message:
          error.message || 'Some error occurred while retrieving Collectors.',
      });
    }
  },
};
