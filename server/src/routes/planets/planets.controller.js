const { planets } = require("../../model/planet.model");

async function getAllplanets(req, res, next) {
  return res.status(200).json(await planets);
}

module.exports = { getAllplanets };
