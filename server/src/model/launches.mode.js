const launches = new Map();

const newLaunch = {
  flightNumber: 100,
  launchDate: new Date("December  12, 2030"),
  customer: ["NASA", "Mato"],
  mission: "Kepler Exoplanets",
  rocket: "Explorer IS1",
  destination: "Kepler-442-b",
  upcoming: true,
  success: true,
};

launches.set(newLaunch.flightNumber, newLaunch);

function allLaunches() {
  return Array.from(launches.values());
}

module.exports = { allLaunches };
