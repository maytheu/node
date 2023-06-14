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
    const planet = await Planet.findOne(
      { kepler_name: launch.target },
      "-__v -_id"
    );
    if (!planet) throw new Error("No planets found");
    await Launch.findOneAndUpdate(
      { flightNumber: launch.flightNumber },
      launch,
      {
        upsert: true,
      }
    );
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

async function getLatestLaunch() {
  try {
    const latestFlight = await Launch.findOne().sort("-flightNumber");
    if (!latestFlight) return latestFlightNum;
    return latestFlight.flightNumber;
  } catch (error) {
    console.error(error);
  }
}

async function postNewLaunch(launch) {
  // latestFlightNum++;
  // launches.set(
  //   latestFlightNum,
  //   Object.assign(launch, {
  //     flightNumber: latestFlightNum,
  //     customer: ["NASA", "Mato"],
  //     upcoming: true,
  //     success: true,
  //   })
  // );

  const flightNum = (await getLatestLaunch()) + 1;
  const launchData = Object.assign(launch, {
    flightNumber: flightNum,
    customers: ["NAsa", "Meto"],
  });

  await saveNewLaunch(launchData);
}

async function removeLaunch(launchID) {
  // const aborted = launches.get(launchID);
  // aborted.upcoming = false;
  // aborted.success = false;
  // return aborted;

  const aborted = await Launch.findOneAndUpdate(
    { flightNumber: launchID },
    { success: false, upcoming: false },
    ""
  );
  return aborted;
}

async function findLaunch(launchId) {
  // return launches.has(launchId);
  return await Launch.findOne({ flightNumber: launchId }, "flightNumber");
}

module.exports = { allLaunches, postNewLaunch, removeLaunch, findLaunch };
