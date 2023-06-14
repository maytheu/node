const { Router } = require("express");

const planetRouter = require("./planets/planets.routes");
const launchesRouter = require("./launches/launches.router");

const api = Router();

api.use("/planets", planetRouter);
api.use("/launches", launchesRouter);

module.exports = api;
