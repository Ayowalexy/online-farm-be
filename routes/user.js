const express = require('express');
const router = express.Router();
const { getAllUsers, getOneUser } = require('../controllers/user')
const { protect } = require('../middlewares/authenticate')


router.route('/').get(protect, getAllUsers);
router.route('/:id').get(protect, getOneUser)

module.exports = router