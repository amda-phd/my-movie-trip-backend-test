const request = require("supertest");

const app = require("@app");
const { setupDB, scenes } = require("@fixturesDB");
const { assert } = require("joi");

beforeEach(setupDB);

describe("/scenes", () => {
  describe("GET /", () => {
    it("Retrieves all items", (done) => {
      request(app).get("/scenes").expect(200, done());
    });
  });
});
