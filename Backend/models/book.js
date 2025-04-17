const mongoose = require('mongoose')

const bookSchema =  mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    reviews: [
        {
            review: { type: String, default: ''},
            rating: { type: Number, default: 0 }
        }
    ],
    rating: {
        type: Number,
        default: 0
    },
    featured: { type: Boolean, default: false }
},  
    { timestamps: true }
)

module.exports = mongoose.model("Book", bookSchema);