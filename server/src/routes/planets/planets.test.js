const request = require("supertest");

const app = require("../../app");

describe("Should get all planets", () => {
  test("it should return 200 status", async () => {
    const resp = await request(app)
      .get("/planets")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
