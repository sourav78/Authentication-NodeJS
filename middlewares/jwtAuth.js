const jwt = require('jsonwebtoken')

const jwtAuth = (req, res, next) => {
    const token = (req.cookies && req.cookies.token) || null

    if (!token) {
        return res.status(400).json({
            success: false,
            msg: "Not Authorized"
        })
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET)
        req.user = { id: payload._id, username: payload.username }
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }

    next()
}

module.exports = jwtAuth