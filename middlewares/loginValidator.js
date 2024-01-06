const loginValidator = (req, res, next) => {
    const { username, password } = req.body

    if( !username || !password){
        return res.status(400).json({
            success: false,
            msg: "All fields are required"
        })
    }

    next()
}

module.exports = loginValidator