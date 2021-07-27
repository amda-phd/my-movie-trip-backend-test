const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

module.exports = {
  create: validator.body(
    Joi.object({
      film: Joi.string().min(5).max(45).required(),
      creation_date: Joi.string().required(),
      photo_url: Joi.string().uri().required(),
      location: Joi.string().min(5).max(45).required(),
      description: Joi.string().min(10).max(500).required(),
      country: Joi.string().min(5).max(45).required(),
      city: Joi.string().min(5).max(45).required(),
    })
  ),
  edit: validator.body(
    Joi.object({
      film: Joi.string().min(5).max(45),
      photo_url: Joi.string().uri(),
      location: Joi.string().min(5).max(45),
      description: Joi.string().min(10).max(500),
      country: Joi.string().min(5).max(45),
      city: Joi.string().min(5).max(45),
    })
  ),
  id: validator.params(Joi.object({ id: Joi.number().min(1).required() })),
  query: validator.query(
    Joi.object({
      sortBy: Joi.string().not().required(),
    })
  ),
};
