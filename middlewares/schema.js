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


const productSchema = Joi.object({
    name: Joi
        .string()
        .required(),
    type: Joi
        .string()
        .required(),
    price: Joi
        .number()
        .required(),
    category: Joi
        .string()
        .required(),
    imageUrl: Joi
        .string()
        .required()
})

const editSchema = Joi.object({
    name: Joi
        .string()
        .required(),
    type: Joi
        .string()
        .required(),
    price: Joi
        .number()
        .required(),
    category: Joi
        .string()
        .required()
})

const statusSchema = Joi.object({
    status: Joi 
        .string()
        .valid('suspended', 'active', 'deactivate')
        .required()
})
module.exports = {
    signupSchema,
    loginSchema,
    productSchema,
    editSchema,
    statusSchema
}