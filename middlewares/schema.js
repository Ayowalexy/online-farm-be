const Joi = require('joi');

const signupSchema = Joi.object({
    email: Joi
        .string()
        .email()
        .required(),
    full_name: Joi
        .string()
        .required(),
    password: Joi
        .string()
        .required(),
    phone: Joi
        .string()
        .required(),
    role: Joi   
        .string()
        .required()
})

const loginSchema = Joi.object({
    email: Joi
        .string()
        .email()
        .required(),
    password: Joi
        .string()
        .required()
})

module.exports = {
    signupSchema,
    loginSchema
}