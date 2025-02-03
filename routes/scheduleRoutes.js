// routes/scheduleRoutes.js
const express = require('express');
const router = express.Router();
const { createSchedule, getSchedulesByDevice } = require('../controllers/scheduleController');

router.post('/', createSchedule);
router.get('/:deviceId', getSchedulesByDevice);

module.exports = router;
