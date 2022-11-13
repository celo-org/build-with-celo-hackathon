const db = require('../models');

const Requests = db.requests;
const Location = db.locations;
const Collectors = db.collectors;

module.exports = {
  login: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Collectors.findOne({ email });
      if (!user)
        return res.json({ msg: "Incorrect Email", status: false });
      // const isPasswordValid = await bcrypt.compare(password, user.password);
      // if (!isPasswordValid)
      //   return res.json({ msg: "Incorrect Username or Password", status: false });
      // delete user.password;
      return res.json({ status: true, user });
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
