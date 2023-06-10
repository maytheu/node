const { planets } = require("../../model/planet.model");

function getAllplanets(req, res, next) {
  return res.status(200).json(planets);
}

module.exports = { getAllplanets };
