const mongoose = require("mongoose");
require("dotenv").config(); //for testing
 
const MONGO = process.env.MONGO_URL;

mongoose.connection.once("open", () => console.log("Mongodb connected"));
mongoose.connection.on("error", (e) => console.error(e));

const loadDb = async () => {
  await mongoose.connect(MONGO);
};

const disconnectDb = async () => {
  await mongoose.disconnect();
};

module.exports = { loadDb, disconnectDb };
