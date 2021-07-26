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

module.exports = router;
