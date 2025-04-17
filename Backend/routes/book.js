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
        await Book.create({...value, featured: value.featuredBook})
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
    const page = parseInt(req.query.page) 
    const limit = parseInt(req.query.limit) 
    const search = req.query.search
    try {
        const query = {}
        if(search) { 
            query.$or = [
                { title: { $regex: search, $options: 'i' }},
                { author: { $regex: search, $options: 'i' }},
                { language: { $regex: search, $options: 'i' }}
            ]
        }
        const books = await Book.find(query).sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(limit)
        const totalBooks = await Book.countDocuments()
        res.status(200).json({ 
            success: true,
            data: books,
            totalPages: Math.ceil(totalBooks/limit)
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// get featured books

router.get('/featured-books', async (req, res) => {
    try {
        const books = await Book.find({ featured: true })
        res.status(200).json({ 
            success: true,
            data: books
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// get recent books --- limit = 4

// router.get('/get-recent-books', async (req, res) => {
//     try {
//         const books = await Book.find().sort({ createdAt: -1 }).limit(4)
//         res.status(200).json({ status: "success", data: books})
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// get book by id

router.get('/book/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        if(!book) {
            return res.status(400).json({
                success: false,
                message: 'book does not exist'
            })
        }
        res.status(200).json({ 
            success: true,
            data: book
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Failed to get book'
         })
    }
})

// add a review 

router.put('/review/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { rating, review } = req.body
        const existingBook = await Book.findOne({ _id: id })
        if(!existingBook) {
            return res.status(400).json({
                success: false,
                message: `book does not exist`
            })
        } 
        existingBook.reviews.push({ rating, review });
        const totalRatings = existingBook.reviews.reduce(
            (sum, item) => sum + item.rating,
            0
        );
        const avgRating = totalRatings / existingBook.reviews.length
        existingBook.rating = avgRating;
        await existingBook.save()
        return res.status(201).json({
            success: true,
            message: 'Review added successfully'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Review failed to add'
        })
    }
})
 
// get all reviews 
router.get('/reviews/:id', async (req, res) => {
    try {
        const { id } = req.params 
        const existingBook = await Book.findOne({ _id: id })
        if(!existingBook) {
            return res.status(400).json({
                success: false,
                message: 'Book does not exist'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Reviews fetched successfully',
            reviews: existingBook.reviews
        })
    } catch (error) {
        
    }
})
module.exports = router