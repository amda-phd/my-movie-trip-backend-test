const { Router } = require("express");

const router = new Router();

router.get("/health", (req, res) => {
  return res.send({ message: "Healthy!" });
});

router.get("/ping", (req, res) => {
  return res.send({ ping: "pong" });
});

module.exports = router;
