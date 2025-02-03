// routes/ownerRoutes.js
const express = require('express');
const router = express.Router();
const { createOwner, getOwners, authenticateOwner } = require('../controllers/ownerController');

router.post('/', createOwner);
router.post('/authenticate', authenticateOwner);
router.get('/', getOwners);

module.exports = router;
