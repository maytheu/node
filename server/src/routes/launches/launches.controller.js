const {  allLaunches } = require("../../model/launches.mode");

function getLaunches(req, res) {
  res.status(200).json(allLaunches());
}

module.exports = { getLaunches };
