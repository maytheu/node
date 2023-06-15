const axios = require("axios");

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

async function allLaunches(skip, limit) {
  // return Array.from(launches.values());
  try {
    return await Launch.find({}, { __v: 0, _id: 0 })
      .sort({ flightNumber: 1 })
      .skip(skip)
      .limit(limit);
  } catch (error) {
    console.error(error);
  }
}

async function getLatestLaunch() {
  try {
    const latestFlight = await filterLaunch({}).sort("-flightNumber");
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

  const planet = await Planet.findOne(
    { kepler_name: launch.target },
    "-__v -_id"
  );
  if (!planet) throw new Error("No planets found");

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
  return await filterLaunch({ flightNumber: launchId });
}

/**
 * generic findone function for launch
 * @param {*} filter
 * @param {*} projection
 * @returns
 */
async function filterLaunch(filter, projection = "flightNumber") {
  return await Launch.findOne(filter, projection);
}

const loadFlightFromSpacex = async () => {
  const spacexFlight = await filterLaunch({ rocket: /Falcon/ });
  if (spacexFlight) {
    console.log("Spacex data available");
  } else {
    await populateLaunchDb();
  }
};

const populateLaunchDb = async () => {
  const resp = await axios.post(
    "https://api.spacexdata.com/v5/launches/query",
    {
      query: {},
      options: {
        pagination: false,
        populate: [
          { path: "rocket", select: { name: 1 } },
          { path: "payloads", select: { customers: 1 } },
        ],
      },
    }
  );

  if (resp.status != 200) {
    console.log("Error downloading");
    throw new Error("Error downloading data");
  }

  const launchDocs = resp.data.docs;
  for (let launchDoc of launchDocs) {
    const payloads = launchDoc.payloads;
    const customers = payloads.flatMap((payload) => payload.customers);

    const launch = {
      flightNumber: launchDoc.flight_number,
      mission: launchDoc.name,
      rocket: launchDoc.rocket.name,
      customers,
      launchDate: launchDoc.date_local,
      upcoming: launchDoc.upcoming,
      success: launchDoc.success,
      target: "",
    };

    await saveNewLaunch(launch);
  }
};

module.exports = {
  allLaunches,
  postNewLaunch,
  removeLaunch,
  findLaunch,
  loadFlightFromSpacex,
};
