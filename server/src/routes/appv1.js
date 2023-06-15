const { Router } = require("express");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");
const path = require("path");

const planetRouter = require("./planets/planets.routes");
const launchesRouter = require("./launches/launches.router");

const file = fs.readFileSync(
  path.join(__dirname, "..", "..", "swagger.yaml"),
  "utf8"
);
const swaggerDocument = YAML.parse(file);

const api = Router();

api.use("/planets", planetRouter);
api.use("/launches", launchesRouter);
api.use("/docs", swaggerUi.serve);
api.get("/docs", swaggerUi.setup(swaggerDocument));

module.exports = api;
