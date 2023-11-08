const Joi = require("joi");
const emailRegexp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

const authSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.empty": `"password" cannot be an empty field`,
    "string.min": `"password" should have a minimum length of {#limit}`,
    "any.required": `"password" is a required field`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": `"Email" is invalid`,
    "string.empty": `"email" cannot be an empty field`,
    "any.required": `"email" is a required field`,
  }),
});

const schemas = {
  authSchema,
};

module.exports = {
  schemas,
};
