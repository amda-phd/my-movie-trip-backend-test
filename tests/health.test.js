const request = require("supertest");

const app = require("../src/app");

// SUCCESS
describe("API should", () => {
  it("be healthy", async () => {
    const response = await request(app).get("/health").expect(200);

    expect(response.body.message).toBeDefined();
  });

  it("ping", async () => {
    const response = await request(app).get("/ping").expect(200);

    expect(response.body.ping).toBeDefined();
  });
});
