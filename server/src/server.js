const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");
const { loadStreamAsync } = require("./model/planet.model");

const PORT = 4005;

const server = http.createServer(app);

mongoose.connection.once("open", () => console.log("Mongodb cnnected"));
mongoose.connection.on("error", (e) => console.error(e));

const startServer = async () => {
  await mongoose.connect(MONGO);
  //wait for stream to load
  await loadStreamAsync();

  server.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
};

startServer();
