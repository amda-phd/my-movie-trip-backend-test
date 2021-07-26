const { Router } = require("express");

const Scenes = require("Models/scenes");

const router = new Router();

router.get("/scenes", async (req, res) => {
  try {
    const scenes = await Scenes.findAll();
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
    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
