const request = require("supertest");

const app = require("../../app");
const db = require("../../service/db");
const { loadStreamAsync } = require("../../model/planet.model");

describe("get launch routes", () => {
  beforeAll(async () => {
    await db.loadDb();
    await loadStreamAsync()
  });

  afterAll(async () => {
    await db.disconnectDb();
  });

  describe("get all launches", () => {
    test("Should return status 200", async () => {
      await request(app).get("/v1/launches").expect(200);
    });
  });

  describe("create new launches", () => {
    const launchData = {
      mission: "Nasa test",
      target: "Kepler-62 f",
      launchDate: "January 27, 2030",
      rocket: "K@1",
    };
    test("it should return 201 launch created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const reqDate = new Date(launchData.launchDate).valueOf();
      const respDate = new Date(response.body.launchDate).valueOf();

      expect(reqDate).toBe(respDate);
      expect(response.body).toMatchObject({
        mission: "Nasa test",
        target: "Kepler-62 f",
        rocket: "K@1",
      });
    });

    test("it should catch required field or blank fields", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send({ mission: "nasa test", target: "Kepler-62 f", launchDate: "" })
        .expect("Content-Type", /json/)
        .expect(422);

      expect(response.body).toStrictEqual({ error: "Pass in required fields" });
    });

    test("it should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send({
          mission: "hi",
          target: "Kepler-62 f",
          launchDate: "invalid date",
          rocket: "try",
        })
        .expect("Content-Type", /json/)
        .expect(422);

      expect(response.body).toStrictEqual({ error: "Invalid date" });
    });
  });

  describe("Delete launch", () => {
    test("it should return 204 status", async () => {
      await request(app).delete("/v1/launches/100").expect(204);
    });

    test("it should catch invalid launch Id", async () => {
      const resp = await request(app).delete("/v1/launches/1000").expect(404);

      expect(resp.body).toStrictEqual({ error: "launch not found" });
    });
  });
});
