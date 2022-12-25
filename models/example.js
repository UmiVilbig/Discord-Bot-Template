const mongoose = require('mongoose')

// a schema for mongoDB
const exampleSchema = new mongoose.Schema({
    // name of the variable: type of the variable
    user_id: String,
})
module.exports = mongoose.model("example", exampleSchema)