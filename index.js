const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config()

const { databaseConnect } = require('./config/dbConnect')
const router = require('./routes/userRoute')


const PORT = process.env.PORT

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
}))

databaseConnect()

app.use("/auth", router)

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))