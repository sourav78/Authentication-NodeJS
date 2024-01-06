const mongoose = require('mongoose')

const databaseConnect = () => {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("Database connected");
    }).catch(err => {
        console.log(err.message);
    })
}

module.exports = {
    databaseConnect,
}