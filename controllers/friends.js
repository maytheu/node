const model = require("../model/friends");

//use named function for easy debugging
function allFriends(req, res) {
  res.json(model);
}

function friend(req, res) {
  const { id } = req.params;
  const friend = model.find((f) => f.id === +id);
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({ error: "Friends not found" });
  }
}

function newFriend(req, res) {
  if (!req.body.name) {
    return res.status(422).json({ msg: "Error, invalid type" });
  }
  const { name } = req.body;
  const newFriend = { name, id: model.length + 1 };
  model.push(newFriend);
  res.status(201).json({ data: newFriend, msg: "New friend added" });
}

module.exports={allFriends, friend, newFriend}