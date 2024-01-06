const express = require('express')

const { signup, signin, getUser } = require('../controllers/userController')
const loginValidator = require('../middlewares/loginValidator')
const registerValidator = require('../middlewares/registerValidator')
const jwtAuth = require('../middlewares/jwtAuth')

const router = express.Router()

router.post('/signup', registerValidator,signup)
router.post('/signin', loginValidator, signin)
router.get('/userinfo', jwtAuth, getUser)

module.exports = router