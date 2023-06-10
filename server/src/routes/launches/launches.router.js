const { Router } = require("express");
const { getLaunches } = require("./launches.controller");

const launchesRouter = Router()

launchesRouter.get('/launches', getLaunches)

module.exports=launchesRouter