const Launch = require("./launches.schema");
const Planet = require("./planets.schema");

const launches = new Map();

let latestFlightNum = 100;

const newLaunch = {
  flightNumber: 100,
  launchDate: new Date("December  12, 2030"),
  customer: ["NASA", "Mato"],
  mission: "Kepler Exoplanets",
  rocket: "Explorer IS1",
  target: "Kepler-442 b",
  upcoming: true,
  success: true,
};

launches.set(newLaunch.flightNumber, newLaunch);

saveNewLaunch(newLaunch);

async function saveNewLaunch(launch) {
  try {
    const planet = await Planet.findOne({ kepler_name: launch.target }, "-__v -_id");
    if (!planet) throw new Error("No planets found");
    await Launch.updateOne({ flightNumber: launch.flightNumber }, launch, {
      upsert: true,
    });
  } catch (error) {
    console.error(error);
  }
}

async function allLaunches() {
  // return Array.from(launches.values());
  try {
   return await Launch.find({}, { __v: 0, _id: 0 });
  } catch (error) {
    console.error(error);
  }
}

function postNewLaunch(launch) {
  latestFlightNum++;
  launches.set(
    latestFlightNum,
    Object.assign(launch, {
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
  aborted.success = false;
  return aborted;
}

function findLaunch(launchId) {
  return launches.has(launchId);
}

module.exports = { allLaunches, postNewLaunch, removeLaunch, findLaunch };
