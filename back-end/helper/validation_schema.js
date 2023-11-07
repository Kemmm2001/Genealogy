const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    repassword:Joi.string().min(6).required(),
    username: Joi.string().required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
});

module.exports = {
    registerSchema, loginSchema
};