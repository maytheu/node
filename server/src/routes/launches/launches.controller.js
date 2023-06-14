const {
  allLaunches,
  postNewLaunch,
  removeLaunch,
  findLaunch,
} = require("../../model/launches.mode");

async function getLaunches(req, res) {
  res.status(200).json(await allLaunches());
}

async function postLaunch(req, res) {
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

  await postNewLaunch(launch);

  return res.status(201).json(launch);
}

async function deleteLaunch(req, res) {
  const { launchId } = req.params;
  const checkLaunch = await findLaunch(launchId);
  if (!checkLaunch) {
    return res.status(404).json({ error: "launch not found" });
  }

  const aborted = await removeLaunch(launchId);
  if (aborted) return res.status(204).json()
  return res.status(400).json({ error: "Error deleting" });
}

module.exports = { getLaunches, postLaunch, deleteLaunch };
