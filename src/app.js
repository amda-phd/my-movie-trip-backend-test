const express = require("express");
const morgan = require("morgan");
const errorhandler = require("errorhandler");

const health = require("Routers/health");
const scenes = require("Routers/scenes");

const app = express();
app.use(express.json());
app.use(
  morgan(
    process.env.NODE_ENV == "dev"
      ? ":method :url :status :response-time ms - :res[content-length]"
      : "tiny"
  )
);
if (process.env.NODE_ENV) {
  app.use(errorhandler());
}

app.use(health);
app.use(scenes);

module.exports = app;
