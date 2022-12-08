const express = require('express');
const router = express.Router();
const { getAllUsers, getOneUser, suspendUser, getAllSellers, stats} = require('../controllers/user')
const { protect } = require('../middlewares/authenticate')


router.route('/').get(protect, getAllUsers);
router.route('/account/:id').get(protect, getOneUser)
router.route('/sellers').get(protect, getAllSellers);
router.route('/suspend/:id').patch(protect, suspendUser);
router.route('/stats').get(protect, stats)

module.exports = router