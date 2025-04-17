const Joi = require('joi')

const bookSchema = Joi.object({
    url: Joi.string().min(5).required(),
    title: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
    desc: Joi.string().min(20).required(),
    language: Joi.string().min(4).required(),
    featuredBook: Joi.boolean()
})

module.exports = bookSchema