const http = require("http");

const app = require("./app");
const { loadStreamAsync } = require("./model/planet.model");

const PORT = 4005;

const server = http.createServer(app);

const startServer = async () => {
  //wait for stream to load
  await loadStreamAsync();

  server.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
};

startServer();
