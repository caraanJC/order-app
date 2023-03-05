const { Schema } = require('mongoose')

module.exports.attachmentSchema = new Schema({
    fieldName: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number
})