const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: String,
    type: {
        type: String,
        enum: ['bulk buy', 'retail buy']
    },
    price: Number,
    category: String,
    imageUrl: String  
}, { timestamps: true })


module.exports = mongoose.model('products', productSchema)