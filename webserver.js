const http = require("http");

const PORT = 4004;
const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("Node js web server");
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
