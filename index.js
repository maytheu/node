const { createReadStream } = require("fs");
const { parse } = require("csv-parse");

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

//reading file as stream
createReadStream("keplar.csv")
  .on("open", () => console.log("file opened"))
  //format the readable stram s to array of object
  .pipe(parse({ comment: "#", columns: true }))
  .on("data", (data) => {
    // console.log("streaming");
    if (isHabitablePlanet(data)) fileStream.push(data);
  })
  .on("error", (err) => console.log(err, "err exist"))
  .on("end", () => {
    const planets = fileStream.map((planet) => ({
      name: planet.kepler_name,
      disposition: planet.koi_disposition,
    }));
    console.log(planets, `${fileStream.length} planets recorded`);
    console.log("steam ended");
  });
