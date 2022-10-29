require("dotenv").config();
const Event = require("node:events");

class MongoDBInstance extends Event {
  constructor() {
    super();
  }

  async checkInstanceByField(Model, field, value) {
    const result = await Model.findOne({ [field]: value }).exec();
    return result;
  }

  async makeEntry(Model, entryObject) {
    try {
      const newModel = await Model.create(entryObject);
      //console.log("Emitting event...");
      this.emit("entryCreated", newModel);
      return newModel;
    } catch (err) {
      console.log("Error when creating an entry: ", err.message);
      throw new Error(err.message);
    }
  }

  async findOneAndUpdate(Model, query, newValueObject) {
    try {
      let updatedObj = await Model.findOneAndUpdate(query, newValueObject);
      this.emit("modelUpdated", updatedObj);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOne(Model, condition) {
    try {
      Model.deleteOne(condition);
      this.emit("deleted");
    } catch (err) {
      throw new Error("Problem deleting document");
    }
  }
}

module.exports = MongoDBInstance;
