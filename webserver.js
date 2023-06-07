const http = require("http");

const PORT = 4004;
const FRIENDS = [
  { id: 1, name: "Mato Lee" },
  { id: 2, name: "Laue Mato" },
  { id: 1, name: "St. Mato Lee" },
];

const server = http.createServer((req, res) => {
  const urls = req.url.split("/");
  //friends endpoint
  if (req.method === "GET" && urls[1] === "friends") {
    res.setHeader("content-type", "application/json");
    res.statusCode = 200;
    //query friend based on id
    if (urls.length === 3) {
      const friend = FRIENDS.find((f) => f.id == urls[2]);
      if (!friend) {
        res.statusCode = 404;
        res.end();
      }
      res.end(JSON.stringify(friend));
    } else {
      res.end(JSON.stringify(FRIENDS));
    }
  }

  //new friends
  else if (req.method === "POST" && urls[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log(friend);
      FRIENDS.push(JSON.parse(friend));
    });
    //pipe the res from req
    req.pipe(res);
  }

  //message endpoint
  else if (req.method === "GET" && urls[2] === "message") {
    res.setHeader("Content-Type", "text/html");

    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>Hi Mato Lee</li>");
    res.write("<li>Welcome to Nodejs server</li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("/<html>");

    res.end();
    I;
  } else if (req.url == "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Node js web server");
  } else {
    res.statusCode = 404;

    res.end();
  }
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
