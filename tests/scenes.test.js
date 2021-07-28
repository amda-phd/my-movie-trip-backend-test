const request = require("supertest");

const app = require("@app");
const { setupDB, scenes } = require("@fixturesDB");
const Scenes = require("Models/scenes");

beforeAll(setupDB);

describe("/scenes", () => {
  describe("GET /", () => {
    it("Retrieves all items", (done) => {
      request(app).get("/scenes").expect(200, done());
    });

    describe("QUERY sortBy", () => {
      describe("creation_date", () => {
        it("Gets right order for asc and desc", async (done) => {
          const asc = await request(app)
            .get("/scenes?sortBy=creation_date")
            .expect(200);
          const desc = await request(app)
            .get("/scenes?sortBy=creation_date_desc")
            .expect(200);
          for (let i = 0; i < asc.body.length; i++) {
            expect(asc.body[i]).toMatchObject(
              desc.body[desc.body.length - i - 1]
            );
            if (i > 0) {
              expect(
                new Date(asc.body[i].creation_date).getTime()
              ).toBeGreaterThan(
                new Date(asc.body[i - 1].creation_date).getTime()
              );
            }
          }
          return done();
        });
      });

      describe("distance_to", () => {
        it("Gets right order for asc and desc", async (done) => {
          const asc = await request(app)
            .get("/scenes?sortBy=distance_to_40.4472979,-3.63865,17")
            .expect(200);
          const desc = await request(app)
            .get("/scenes?sortBy=distance_to_40.4472979,-3.63865,17_desc")
            .expect(200);
          for (let i = 0; i < asc.body.length; i++) {
            expect(asc.body[i]).toMatchObject(
              desc.body[desc.body.length - i - 1]
            );
          }
          expect(asc.body[0].city).toBe("Madrid");
          expect(desc.body[0].city).not.toBe("Madrid");
          expect(asc.body[1].city).toBe("Lisboa");
          expect(asc.body[2].city).toBe("París");
          return done();
        });
      });
    });

    describe("QUERY unexpected field", () => {
      it("Produces coherent error and doesn't return items", (done) => {
        request(app).get("/scenes?country=Spain").expect(400, done());
      });
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
      it("Throws coherent error and doesn't modify field", async (done) => {
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

  describe("DELETE /:id", () => {
    it("Removes item from database", async (done) => {
      await request(app).delete("/scenes/2").expect(204);
      const scene = await Scenes.findOne({
        where: { id: 2 },
      });
      expect(scene).toBeNull();
      return done();
    });
  });
});
