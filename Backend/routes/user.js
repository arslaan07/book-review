const express = require('express') 
const User = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middlewares/verifyToken')
const {signinSchema, signupSchema} = require('../middlewares/userSchema')

// Sign Up
router.post('/sign-up', async (req, res) => {
    try {
        const { error, value } = signupSchema.validate(req.body)
        if(error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        const { email, password } = value
        const existingEmail = await User.findOne({email})
        if(existingEmail) {
            return res.status(400).json({
                success: false,
                message: "email already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)
        const newUser = await User.create({...value, password: hashPass })
        const token = jwt.sign({id: newUser._id, role: newUser.role}, process.env.JWT_SECRET_TOKEN, { expiresIn: '7d'})
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'? true : false,
            sameSite: process.env.NODE_ENV === 'production'? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({ 
            success: true,
            message: "Sign up successfull",
            role: newUser.role,
            email: newUser.email
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
         })
    }
})
 
// Sign In 

router.post('/sign-in', async (req, res) => {
    try {
        const { error, value } = signinSchema.validate(req.body)
        if(error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        const { email, password } = value
        const existingUser = await User.findOne({ email })
        if(!existingUser) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"})
        }
        const result = await bcrypt.compare(password, existingUser.password)
        if(!result) {
            return res.status(400).json({
                success: 'false',
                message: 'invalid credentials'
            })
        }
        const token = jwt.sign({id: existingUser._id, role: existingUser.role}, process.env.JWT_SECRET_TOKEN, { expiresIn: '7d'})
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'? true : false,
            sameSite: process.env.NODE_ENV === 'production'? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            success: true,
            message: 'login successful',
            role: existingUser.role,
            email: existingUser.email
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get User Info

router.get('/user', verifyToken, async (req, res) => {
    try {
        const { id } = req.user
        const data = await User.findById(id).select("-password")
        return res.status(200).json({ 
            success: true,
            data
         })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'failed to fetch user details'
         })
    }
})

// Update user
router.put('/user', verifyToken, async (req, res) => {
    try {
        const { id } = req.user
        const { email, oldPassword } = req.body

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            })
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid password" 
            })
        }

        const emailAlreadyExists = await User.findOne({email})
        if(emailAlreadyExists) {
            return res.status(400).json({ 
                success: false,
                message: "Email already taken" 
            });
        } 
        user.email = email; 
        await user.save();
 
        return res.status(200).json({
            success: true,
            message: "Email updated successfully" ,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: `User update failed` });
    }
});

module.exports = router