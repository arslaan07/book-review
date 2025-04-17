const Joi = require('joi');

const baseUserSchema = {
    email: Joi.string().min(4).required()
        .pattern(new RegExp('^[^@]+@[^@]+\\.[^@]+$'))
        .messages({
            'string.pattern.base': 'Please provide a valid email address',
            'any.required': 'Email is required',
            'string.min': 'Email must be at least 4 characters long'
        }),
    password: Joi.string().min(8).required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'any.required': 'Password is required'
        })
};

const signinSchema = Joi.object({
    ...baseUserSchema,
});

const signupSchema = Joi.object({
    ...baseUserSchema,
    password: baseUserSchema.password
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
        .messages({
            ...baseUserSchema.password.messages,
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
        .messages({
            'any.only': 'Passwords do not match',
            'any.required': 'Please confirm your password'
        }),
});

module.exports = {
    signinSchema,
    signupSchema
};