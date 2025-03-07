// routes/deviceRoutes.js
const express = require('express');
const router = express.Router();
const { createDevice, getDevicesByOwner, getDeviceById, deleteDevice, handleDeviceStatus} = require('../controllers/deviceController');

router.post('/', createDevice);
router.put('/device', handleDeviceStatus);
router.get('/:ownerId', getDevicesByOwner);
router.get('/device/:deviceId', getDeviceById);
router.delete('/:deviceId', deleteDevice);

module.exports = router;
