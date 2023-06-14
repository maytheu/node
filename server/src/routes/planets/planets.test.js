const request = require("supertest");

const app = require("../../app");
const db = require("../../service/db");

describe("Should get all planets", () => {
  beforeAll(async () => {
    await db.loadDb();
  });

  afterAll(async () => {
    await db.disconnectDb();
  });

  test("it should return 200 status", async () => {
    const resp = await request(app)
      .get("/planets")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
