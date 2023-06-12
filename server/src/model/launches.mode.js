const launches = new Map();

let latestFlightNum = 100;

const newLaunch = {
  flightNumber: 100,
  launchDate: new Date("December  12, 2030"),
  customer: ["NASA", "Mato"],
  mission: "Kepler Exoplanets",
  rocket: "Explorer IS1",
  target: "Kepler-442-b",
  upcoming: true,
  success: true,
};

launches.set(newLaunch.flightNumber, newLaunch);

function allLaunches() {
  return Array.from(launches.values());
}

function postNewLaunch(launch) {
  latestFlightNum++;
  launches.set(
    latestFlightNum,
    Object.assign(launch,{
      flightNumber: latestFlightNum,
      customer: ["NASA", "Mato"],
      upcoming: true,
      success: true,
    })
  );
}

function removeLaunch(launchID) {
  const aborted = launches.get(launchID);
  aborted.upcoming = false;
  aborted.success=false
  return aborted
}

function findLaunch(launchId) {
  return launches.has(launchId);
}

module.exports = { allLaunches, postNewLaunch, removeLaunch , findLaunch};
