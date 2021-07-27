const { Router } = require("express");

const MyMovieTripDB = require("@DB");
const Scenes = require("Models/scenes");

const router = new Router();

router.get("/scenes", async (req, res) => {
  try {
    let scenes;
    if (req.query.sortBy) {
      let parts = [];
      if (req.query.sortBy.includes("creation_date")) {
        parts.push([
          "creation_date",
          req.query.sortBy.includes("desc") ? "DESC" : "ASC",
        ]);
        scenes = await Scenes.findAll({
          order: [parts],
        });
      } else if (req.query.sortBy.includes("closest_to")) {
        let metadata;
        const coords = req.query.sortBy.split("_")[2];
        const user_lat = coords.split(",")[0];
        const user_lng = coords.split(",")[1];
        const query = `SELECT *, SUBSTRING_INDEX(location, ', ', 1) AS lat, SUBSTRING_INDEX(location, ', ', -1) AS lng FROM scenes ORDER BY ((lat-${user_lat})*(lat-${user_lat})) + ((lng - ${user_lng})*(lng - ${user_lng})) ASC`;
        [scenes, metadata] = await MyMovieTripDB.query(query);
      }
    } else {
      scenes = await Scenes.findAll();
    }

    return res.send(scenes);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});

router.post("/scenes", async (req, res) => {
  try {
    const scene = await Scenes.create(req.body);
    return res.status(201).send(scene);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});

router.get("/scenes/:id", async (req, res) => {
  try {
    const scene = await Scenes.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!scene) {
      return res.status(404).send({ error: "Scene not found" });
    }
    return res.send(scene);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});

router.patch("/scenes/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(406).send({ error: "This route requires an id" });
  }
  try {
    const scene = await Scenes.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!scene) {
      return res.status(404).send({ error: "Scene not found" });
    }
    Object.keys(req.body).forEach((key) => {
      scene[key] = req.body[key];
    });
    await scene.save();
    await scene.reload();
    return res.send(scene);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});

router.delete("/scenes/:id", async (req, res) => {
  try {
    const scene = await Scenes.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!scene) {
      return res.status(404).send({ error: "Scene not found" });
    }
    await scene.destroy();
    return res.status(204);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
