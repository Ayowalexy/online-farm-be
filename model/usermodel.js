const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;


const userModel = new Schema({
    email: {
        type: String,
        unique: true,
        index: true
    },
    full_name: String,
    password: String,
    phone: String,
    role: {
        type: String,
        default: 'seller',
        enum: ['seller', 'admin', 'user']
    }
}, { timestamps: true })

userModel.plugin(uniqueValidator, {
    message: 'Error, {VALUE} already exists.'
});

module.exports = mongoose.model('user', userModel)