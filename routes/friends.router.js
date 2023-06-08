const { Router } = require("express");

const { allFriends, friend, newFriend } = require("../controllers/friends");

const friendRouter = Router();

friendRouter.get("/friends", allFriends);
friendRouter.get("/friend/:id", friend);
friendRouter.post("/friend", newFriend);

module.exports = friendRouter;
