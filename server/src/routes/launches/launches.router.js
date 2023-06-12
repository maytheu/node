const { Router } = require("express");
const {
  getLaunches,
  postLaunch,
  deleteLaunch,
} = require("./launches.controller");

const launchesRouter = Router();

launchesRouter.get("/", getLaunches);
launchesRouter.post("/", postLaunch);
launchesRouter.delete("/:launchId", deleteLaunch);

module.exports = launchesRouter;
