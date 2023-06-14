const mongoose = require("mongoose");


mongoose.connection.once("open", () => console.log("Mongodb connected"));
mongoose.connection.on("error", (e) => console.error(e));

const loadDb = async () => {
  await mongoose.connect(MONGO);
};

const disconnectDb = async () => {
  await mongoose.disconnect();
};

module.exports = { loadDb, disconnectDb };
