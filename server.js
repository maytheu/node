const express = require("express");
const friendRouter = require("./routes/friends.router");

const app = express();
const PORT = 4004;


//cla time middleware
app.use((req, res, next) => {
  const startReq = Date.now();
  next();
  const reqTime = Date.now() - startReq;
  console.log(`${req.method} ${req.baseUrl}${req.url} took ${reqTime}ms`);
});

//to have access to the body add express.json()
app.use(express.json());

app.use(friendRouter)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
