const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    }
}, { timestamps: true})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }

    this.password = await bcrypt.hash(this.password, 10)
    return next()
})

userSchema.methods = {
    jwtToken(){
        return JWT.sign(
            {
                id: this._id,
                username: this.username
            },
            process.env.SECRET,
            {
                expiresIn: '24h'
            }
        )
    }
}

const userModel = mongoose.model("users", userSchema)

module.exports = userModel