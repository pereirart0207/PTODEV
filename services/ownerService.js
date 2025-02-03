// services/ownerService.js
const pool = require('../db');
const bcrypt = require('bcryptjs');
exports.createOwner = async ({ name, email, PIN}) => {

  const createdAt = new Date();
  const salt = await bcrypt.genSalt(10); 
  const hashedPIN = await bcrypt.hash(PIN, salt);

  const result = await pool.query(
    'INSERT INTO "owner" ("name", "email", "PIN", "created_at") VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, hashedPIN, createdAt]
  );
  return result.rows[0];
};

exports.updateOwner = async ( {id, name, email, PIN, description, phone}) => {
  const salt = await bcrypt.genSalt(10); 
  const hashedPIN = await bcrypt.hash(PIN, salt);
  const result = await pool.query(
    'UPDATE "owner" SET "name"=$1, "email"=$2, "PIN"=$3, "description"=$4, "phone"=$5 WHERE "id"=$6 RETURNING *',
    [name, email, hashedPIN, description, phone, id]
  );
  return result.rows[0];
}

exports.verifyPIN = async (email, enteredPIN) => {
    // Buscar al propietario por correo electrónico
    const result = await pool.query('SELECT * FROM "owner" WHERE "email" = $1', [email]);
    const owner = result.rows[0];
  
    if (!owner) {
      throw new Error('Propietario no encontrado');
    }
      // Verificar el PIN ingresado contra el PIN encriptado
  const isMatch = await bcrypt.compare(enteredPIN, owner.PIN);
  return {isMatch, owner}; // Devuelve `true` si los PIN coinciden, de lo contrario `false`
};

exports.getOwners = async () => {
  const result = await pool.query('SELECT * FROM "owner"');
  return result.rows;
};


  