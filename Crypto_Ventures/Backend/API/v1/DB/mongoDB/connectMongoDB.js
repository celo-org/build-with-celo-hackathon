const connect = async (odm, url) => {
  try {
    await odm.connect(url);
  } catch (error) {
    console.log("Unable to connect to database");
    throw new Error(error.message);
  }
};

module.exports = connect;
