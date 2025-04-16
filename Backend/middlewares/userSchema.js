const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string().min(4).required(),
    email: Joi.string().min(4).required()
    .pattern(new RegExp('^[^@]+@[^@]+\.[^@]+$'))
    .messages(
        {
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }
    ),
    password: Joi.string().min(8).required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])'))
    .messages(
        {
            'string.pattern.base': 'Password must contain at least one uppercase, one lowercase, one number and one special character',
            'string.min': 'Password must be at least 8 characters long',
            'any.required': 'Password is required'
        }
    )
})

module.exports = userSchema