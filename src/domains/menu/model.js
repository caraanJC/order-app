const mongoose = require('mongoose')
const { attachmentSchema } = require('../../schemas/attachment')
const Schema = mongoose.Schema

const MenuSchema = new Schema({
    name: {
        type: String,
        required: [
            true,
            "Name is required."
        ],
        unique: true
    },
    price: {
        type: Number,
        required: [
            true,
            "Price is required."
        ]
    },
    picture: {
        type: attachmentSchema
    }
})

MenuSchema.methods.validatePrice = function () {
    if (this.price < 1) {
        throw new Error("Price must be greater than 0.")
    }
}

MenuSchema.pre('save', function() {
    this.validatePrice()
})

const Menu = mongoose.model('Menu', MenuSchema)

module.exports = Menu