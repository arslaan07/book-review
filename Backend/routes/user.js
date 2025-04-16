const express = require('express') 
const User = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middlewares/verifyToken')
const userSchema = require('../middlewares/userSchema')

// Sign Up
router.post('/sign-up', async (req, res) => {
    try {
        const { error, value } = userSchema.validate(req.body)
        if(error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        const { username, email, password } = value
        const existingUsername = await User.findOne({username})
        if(existingUsername) {
            return res.status(400).json({ message: "username already exists"})
        }
        const existingEmail = await User.findOne({email})
        if(existingEmail) {
            return res.status(400).json({ message: "email already exists"})
        }
        
        const hashPass = await bcrypt.hash(password, 10)
        const newUser = await User.create(value)
        const token = jwt.sign({id: newUser._id, role: newUser.role}, process.env.JWT_SECRET_TOKEN, { expiresIn: '7d'})
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'? true : false,
            sameSite: process.env.NODE_ENV === 'production'? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({ 
            success: true,
            message: "Sign up successfull"
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
        const { username, password} = req.body
        const existingUser = await User.findOne({ username })
        if(!existingUser) {
            return res.status(400).json({ message: "Invalid credentials"})
        }
        // await bcrypt.compare(password, existingUser.password, (err, data) => {
        //     if(data) {
        //         const authClaims = [
        //             {
        //                 name: existingUser.username
        //             },
        //             {
        //                 role: existingUser.role
        //             }
        //         ]
        //         const token = jwt.sign({ authClaims }, "bookStore123", { 
        //             expiresIn: "30d"
        //         })
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
            message: 'login successful'
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get User Info

router.get('/get-user-info', verifyToken, async (req, res) => {
    try {
        const { id } = req.headers
        const data = await User.findById(id).select("-password")
        return res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Update address
router.put('/update-address', verifyToken, async (req, res) => {
    try {
        const { id } = req.headers
        const { address } = req.body
        await User.findByIdAndUpdate(id, {address: address})
        return res.status(200).json({ message: "Address updated" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router