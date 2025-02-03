// services/scheduleService.js
const pool = require('../db');

exports.createSchedule = async ({ device_id, start_time, action, recurrence_rule }) => {

  const createdAt = new Date();

  const result = await pool.query(
    'INSERT INTO "schedule" ("device_id", "start_time", "action", "recurrence_rule", "created_at") VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [device_id, start_time, action, recurrence_rule, createdAt]
  );
  return result.rows[0];
};

exports.getSchedulesByDevice = async (deviceId) => {
  const result = await pool.query('SELECT * FROM "schedule" WHERE "device_id" = $1', [deviceId]);
  return result.rows;
};

exports.deleteSchedule = async (id) => {
  const result = await pool.query('DELETE FROM "schedule" WHERE "id" = $1', [id]);
  return result.rows[0];
};