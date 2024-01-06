const bcrypt = require('bcrypt')

const userModel = require('../models/userModels')

const signup = async (req, res) => {

    const { name, username, email, password, bio } = req.body

    try {
        const entry = await userModel.create({
            name: name,
            username: username,
            email: email,
            password: password,
            bio: bio,
        })

        // const userInfo = userModel(req.body)
        // const entry = await userInfo.save()

        entry.password = undefined

        return res.status(200).json({
            success: true,
            data: entry
        })
    } catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                msg: "Email is already exist"
            })
        }

        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}

const signin = async (req, res) => {

    const { username, password } = req.body

    try {
        const user = await userModel.findOne({ username })

        passRes = await bcrypt.compare(password, user.password)

        if (!user || !passRes) {
            return res.status(400).json({
                success: false,
                msg: "Please enter correct password",
            })
        }

        const token = user.jwtToken()

        user.password = undefined

        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: none,
        }
        
        res.cookie("token", token, cookieOption)

        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}

const getUser = async (req, res) => {
    const username = req.user.username

    const user = await userModel.findOne({username})

    if(!user){
        return res.status(400).json({
            success: false,
            msg: "No data found"
        })
    }

    user.password = undefined

    return res.status(200).json({
        success: true,
        data: user
    })
}

module.exports = {
    signin,
    signup,
    getUser,
}