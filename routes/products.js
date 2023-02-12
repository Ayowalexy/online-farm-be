const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authenticate')
const { getAllProduct, addProduct, editProduct, deleteProduct, getProductType } = require('../controllers/products');
    
router.route('/all-products').get(
    getProductType
)


router.route('/:id')
    .delete(protect, deleteProduct)
    .patch(protect, editProduct)
    .get(protect, getAllProduct)
    .post(protect, addProduct)


module.exports = router