const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userModel = new Schema({
    email: String,
    full_name: String,
    password: String,
    role: {
        type: String,
        default: 'seller'
    }
}, { timestamps: true })

module.exports = mongoose.model('user', userModel)