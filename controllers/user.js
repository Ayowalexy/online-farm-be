const asynchandler = require('express-async-handler');
const User = require('../model/usermodel');
const { statusSchema } = require('../middlewares/schema')
const Product = require('../model/productModel')

const getAllUsers = asynchandler(async (req, res) => {
    const allUsers = await User.find({ role: 'user' });
    res.status(201).json({ "status": "success", "data": allUsers, "message": "All users retrieved succesfully" })
})

const getOneUser = asynchandler(async (req, res) => {

    const user = await User.findById({ _id: req.params.id });

    if (user) {
        res.status(201).json({ "status": "success", "data": user, "message": "User retrieved succesfully" })
    }
})

const getAllSellers = asynchandler(async (req, res) => {
    const allSellers = await User.find({ role: 'seller' })
    res.status(201).json({ "status": "success", "data": allSellers, "message": "All sellers retrieved succesfully" })

})


const suspendUser = asynchandler(async (req, res) => {
    const { error, value } = statusSchema.validate(req.body);

    if (error) {
        return res
            .status(401)
            .json(
                {
                    status: "error",
                    message: "invalid request",
                    meta: {
                        error: error.message
                    }
                })
    }
    const user = await User.findById({ _id: req.params.id });
    if (user) {
        user.status = value.status;
        await user.save();
    }
    res.status(201).json({ "status": "success", "data": user, "message": "Status updated" })

})

const stats = asynchandler( async (req, res ) => {
    const no_of_sellers = await User.count({role: 'seller'});
    const no_of_users = await User.count({role: 'user'});
    const no_of_products = await Product.count();
    const new_account = await User.find().limit(5)

    const data = {
        no_of_products,
        no_of_sellers,
        no_of_users,
        new_account: new_account.length
    }
    res.status(201).json({ "status": "success", "data": data, "message": "Status updated" })

})

module.exports = {
    getAllUsers,
    getOneUser,
    getAllSellers,
    suspendUser,
    stats

}