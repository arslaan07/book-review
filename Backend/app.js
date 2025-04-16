const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
require('./connection/connection')
const userRoute = require('./routes/user')
const bookRoute = require('./routes/book')
const connectDB = require('./connection/connection')
connectDB()
const cookieParser = require('cookie-parser')

const allowedOrigins = [
    "http://localhost:5173", // Development environment
    process.env.FRONTEND_URL, // Production environment
  ];
  
  app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.use('/api/v1', userRoute)
app.use('/api/v1', bookRoute)


const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.end('API is running')
})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
