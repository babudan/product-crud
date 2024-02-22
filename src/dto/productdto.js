const Joi = require('joi');
const mongoose = require("mongoose");

const productvalidationscehma = Joi.object({
    product_name: Joi.string().required(),
    price: Joi.string().required(),
    category: Joi.string().required()
});

const productsearchvalidationscehma = Joi.object({
    price: Joi.string(),
    category: Joi.string()
});

const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}

module.exports = { productvalidationscehma, isValidObjectId, productsearchvalidationscehma }