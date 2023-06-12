const {
  allLaunches,
  postNewLaunch,
  removeLaunch,
  findLaunch,
} = require("../../model/launches.mode");

function getLaunches(req, res) {
  res.status(200).json(allLaunches());
}

function postLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.launchDate ||
    !launch.target ||
    !launch.rocket
  ) {
    return res.status(422).json({ error: "Pass in required fields" });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(422).json({ error: "Invalid date" });
  }

  postNewLaunch(launch);

  return res.status(201).json(launch);
}

function deleteLaunch(req, res) {
  const { launchId } = req.params;
  if (!findLaunch(+launchId)) {
    return res.status(404).json({ error: "launch not found" });
  }

  const aborted = removeLaunch(+launchId);

  return res.status(204).json(aborted);
}

module.exports = { getLaunches, postLaunch, deleteLaunch };
