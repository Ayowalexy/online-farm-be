const asynchandler = require('express-async-handler');
const User = require('../model/usermodel');


const getAllUsers = asynchandler(async(req, res) => {
    const allUsers = await User.find();
    res.status(201).json({ "status": "success", "data": allUsers, "message": "All users retrieved succesfully"})
})

const getOneUser = asynchandler(async( req, res) => {

    const user = await User.findById({_id: req.params.id});

    if(user){
        res.status(201).json({ "status": "success", "data": user, "message": "User retrieved succesfully"})
    }
})

module.exports = {
    getAllUsers,
    getOneUser
}