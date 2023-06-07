const express = require("express");

const app = express();
const PORT = 4004;

const FRIENDS = [
  { id: 1, name: "Mato Lee" },
  { id: 2, name: "Laue Mato" },
  { id: 1, name: "St. Mato Lee" },
];

app.get("/friends", (req, res) => {
  res.json(FRIENDS);
});

app.get("/friend/:id", (req, res) => {
  const { id } = req.params;
  const friend = FRIENDS.find((f) => f.id === +id);
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({ error: "Friends not found" });
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
