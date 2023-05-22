const Joi = require("joi");

exports.registerSchema = Joi.object().keys({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

exports.loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

exports.updateProfileSchema = Joi.object().keys({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(11).required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  post_code: Joi.string().required(),
});
