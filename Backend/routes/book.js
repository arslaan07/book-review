const express = require('express') 
const User = require('../models/user')
const Book = require('../models/book')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const bookSchema = require('../middlewares/bookSchema')

// add book --- admin

router.post('/book', verifyToken, async (req, res) => {
    try {
        const { id, role } = req.user

        if(role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied' })
        }
        const { error, value } = bookSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        await Book.create(value)
        return res.status(201).json({ 
            success: true,
            message: "Book added successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Failed to add book, ${error.message}`})
    }
})


// get all books --- public 

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 })
        res.status(200).json({ status: "success", data: books})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// get recent books --- limit = 4

router.get('/get-recent-books', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4)
        res.status(200).json({ status: "success", data: books})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// get book by id

router.get('/book/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        res.status(200).json({ status: "success", data: book})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

 
module.exports = router