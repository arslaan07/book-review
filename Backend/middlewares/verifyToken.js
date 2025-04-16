const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    
    const token = req.cookies.token
    if(!token) {
        return res.status(401).json({ 
            sucess: false,
            message: "Authentication token required" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
        req.user = decoded
        next()
    } catch (error) {  
        return res.status(500).json({
            success: false,
            message: `Authentication failed, ${error.message}`
        })
    }
}

module.exports = verifyToken