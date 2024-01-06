const validateEmail = require('email-validator')

const registerValidator = (req, res, next) => {
    const { name, username, email, password, bio } = req.body

    if (!name || !username || !email || !password || !bio) {
        return res.status(400).json({
            success: false,
            msg: "All fields are required"
        })
    }

    const validatedEmail = validateEmail.validate(email)
    if (!validatedEmail) {
        return res.status(400).json({
            success: false,
            msg: "Please provide correct email"
        })
    }

    next()
}

module.exports = registerValidator