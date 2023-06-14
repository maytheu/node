const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");

const Planet = require("./planets.schema");

const fileStream = [];

//filter habitable planet
const isHabitablePlanet = (planets) => {
  return (
    planets["koi_disposition"] == "CONFIRMED" &&
    planets["koi_insol"] >= 0.36 &&
    planets["koi_insol"] <= 1.11 &&
    planets["koi_prad"] < 1.6
  );
};

//since tream is async, we have to wait for data before working on it
const loadStreamAsync = () => {
  return new Promise((res, rej) => {
    //reading file as stream
    fs.createReadStream(path.join(__dirname, "data", "keplar.csv"))
      .on("open", () => console.log("file opened"))
      //format the readable stram s to array of object
      .pipe(parse({ comment: "#", columns: true }))
      .on("data", async (data) => {
        // console.log("streaming");
        if (isHabitablePlanet(data)) {
          //upsert data to db
          await saveAllPlanet(data.kepler_name);
        }
      })
      .on("error", (err) => rej(err))
      .on("end", () => {
        const planets = fileStream.map((planet) => ({
          name: planet.kepler_name,
          disposition: planet.koi_disposition,
        }));
        res();
      });
  });
};

async function allPlanets() {
  try {
    return await Planet.find({}, '-__v -_id'); 
  } catch (error) {
    console.log(error);
  }
}

async function saveAllPlanet(planetName) {
  try {
    //update only if data do not exist
    await Planet.updateOne(
      { kepler_name: planetName },
      { kepler_name: planetName },
      { upsert: true }
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = { planets: allPlanets(), loadStreamAsync };
