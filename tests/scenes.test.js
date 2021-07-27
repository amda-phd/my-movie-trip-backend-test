const request = require("supertest");

const app = require("@app");
const { setupDB, scenes } = require("@fixturesDB");
const { assert } = require("joi");
const Scenes = require("../src/models/scenes");

beforeAll(setupDB);

describe("/scenes", () => {
  describe("GET /", () => {
    it("Retrieves all items", (done) => {
      request(app).get("/scenes").expect(200, done());
    });
  });

  describe("POST /", () => {
    describe("Valid scene", () => {
      it("Creates new item", async (done) => {
        const response = await request(app)
          .post("/scenes")
          .send(scenes[5])
          .expect(201);

        const scene = await Scenes.findOne({
          where: { id: 6 },
        });
        expect(scene).toBeDefined();
        expect(scene).toMatchObject(response.body);
        return done();
      });
    });

    describe("Invalid scene", () => {
      it("Doesn't create new item", async (done) => {
        await request(app)
          .post("/scenes")
          .send({ ...scenes[5], location: undefined })
          .expect(400);

        const scene = await Scenes.findOne({
          where: { id: 7 },
        });
        expect(scene).toBeNull(done());
      });
    });
  });

  describe("GET /:id", () => {
    describe("Valid id", () => {
      it("Gets right scene", (done) => {
        request(app)
          .get("/scenes/3")
          .expect(200, { ...scenes[2], id: 3 }, done());
      });
    });

    describe("Non existent id", () => {
      it("Returns not foud", (done) => {
        request(app).get("/scenes/10").expect(404, done());
      });
    });

    describe("Invalid id", () => {
      it("Produces a coherent error", (done) => {
        request(app).get("/scenes/bla").expect(400, done());
      });
    });
  });

  describe("PATCH /:id", () => {
    describe("Editable field", () => {
      it("Modifies the required field", async (done) => {
        await request(app)
          .patch("/scenes/2")
          .send({ city: "Barcelona" })
          .expect(200);

        await Scenes.sync();
        const scene = await Scenes.findOne({
          where: { id: 2 },
        });
        expect(scene.city).toBe("Barcelona");
        return done();
      });
    });

    describe("Non-editable field", () => {
      it("Throw coherent error and doesn't modify field", async (done) => {
        await request(app)
          .patch("/scenes/2")
          .send({ creation_date: "09/15/2021" })
          .expect(400);
        const scene = await Scenes.findOne({
          where: { id: 2 },
        });
        expect(scene.creation_date).not.toBe("2021-09-15");
        return done();
      });
    });
  });
});
