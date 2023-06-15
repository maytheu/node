require("dotenv").config();
const http = require("http");

const app = require("./app");
const { loadStreamAsync } = require("./model/planet.model");
const db = require("./service/db");
const { loadFlightFromSpacex } = require("./model/launches.mode");

const PORT = process.env.PORT || 4005;

const server = http.createServer(app);

const startServer = async () => {
  await db.loadDb();
  //wait for stream to load
  await loadStreamAsync();
  await loadFlightFromSpacex();

  server.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
};

startServer();
