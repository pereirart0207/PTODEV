const pool = require('../db');

exports.createDevice = async ({ name, owner_id, description, scheduled }) => {

  const createdAt = new Date();

  const result = await pool.query(
    'INSERT INTO "device" ("name", "owner_id", "description", "scheduled", "created_at") VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, owner_id, description, scheduled, createdAt]
  );
  return result.rows[0];
};

exports.handleDeviceStatus =  async ({status, id}) => {

  const handledAt = new Date();
  const result = await pool.query(
    'UPDATE "device" SET "status" = $1 WHERE "id" = $2 RETURNING *',
    [!status, id]
  );
  const inHistory =  await pool.query('INSERT INTO device_status_history ("device_id","status"), VALUES($1,$2)', 
    [id,!status]
  );
  return result.rows[0];

}

exports.editDevice = async ({ name, owner_id, description, scheduled}) => {
    const result = await pool.query(
      'INSERT INTO "device" ("name", "owner_id", "description", "scheduled") VALUES ($1, $2, $3, $4) RETURNING *',
      [name, owner_id, description, scheduled]
    );
    return result.rows[0];
  };
  
exports.deleteDevice = async ({id}) => {
        const result = await pool.query(
      'DELETE FROM "device" WHERE device.id=$1',
      [id]
    );
    return result.rows[0];
  };
  
exports.getDevicesByOwner = async (ownerId) => {
  const result = await pool.query('SELECT * FROM "device" WHERE "owner_id" = $1', [ownerId]);
  return result.rows;
};

exports.getHistoryByDeviceId = async (deviceId) => {
  const result = await pool.query('SELECT status, changed_at FROM "device_status_history" WHERE "device_id" = $1 ORDER BY changed_at', [deviceId]);
  return result.rows;
};

exports.getDeviceById = async (deviceId) => {
  const result = await pool.query('SELECT * FROM "device" WHERE "id" = $1', [deviceId]);
  return result.rows[0];
};
