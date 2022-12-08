const asynchandler = require('express-async-handler');
const { productSchema, editSchema } = require('../middlewares/schema')
const Product = require('../model/productModel');
const User = require('../model/usermodel')


const addProduct = asynchandler(async (req, res) => {

    const { error, value } = productSchema.validate(req.body);

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
        const product = new Product({ ...value })
        user.products.push(product)
        await user.save();
        await product.save();
        res.status(201).json({ "status": "success", "data": product, "meta": {} })
    }

})


const getAllProduct = asynchandler(async (req, res) => {

    const user = await User.findById({ _id: req.params.id }).populate('products')
    if (user) {
        let allProducts = [];
        if (user.role === 'admin') {
            const products = await Product.find();
            allProducts = products
        } else if (user.role === 'seller') {
            allProducts = user.products
        }

        res.status(201).json({ "status": "success", "data": allProducts, "meta": {} })
    }
})

const deleteProduct = asynchandler(async (req, res) => {

    await Product.findByIdAndDelete({ _id: req.params.id })
    const products = await Product.find();
    res.status(201).json({ "status": "success", "data": products, "meta": {} })

})

const editProduct = asynchandler(async (req, res) => {

    console.log(req.body)
    const { error, value } = editSchema.validate(req.body);

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
    await Product.findByIdAndUpdate({ _id: req.params.id }, { ...value });
    console.log(req.body)
    const products = await Product.find();
    res.status(201).json({ "status": "success", "data": products, "meta": {} })


})

module.exports = {
    addProduct,
    getAllProduct,
    editProduct,
    deleteProduct
}