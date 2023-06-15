const mongoose = require("mongoose");

const MONGO =
  "mongodb+srv://Laue:7p4shcriIAgkEfXI@cluster0.buxmd.mongodb.net/nasa?retryWrites=true";

mongoose.connection.once("open", () => console.log("Mongodb connected"));
mongoose.connection.on("error", (e) => console.error(e));

const loadDb = async () => {
  await mongoose.connect(MONGO);
};

const disconnectDb = async () => {
  await mongoose.disconnect();
};

module.exports = { loadDb, disconnectDb };
