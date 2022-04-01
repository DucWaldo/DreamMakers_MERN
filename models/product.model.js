const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        unique: true,
        trim: true,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    images: {
        type: Object,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    origin: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    glass: {
        type: String,
        require: true
    },
    insurance: {
        type: String,
        require: true
    },
    waterproof: {
        type: String,
        require: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    sold: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Products", productSchema)