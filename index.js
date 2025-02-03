// index.js
const express = require('express');
const pool = require('./db');
const app = express();
const ownerRoutes = require('./routes/ownerRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');

const checkDbConnection = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('Conexión a la base de datos exitosa!');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1);
  }
};

checkDbConnection()
  .then(() => {
    app.use(express.json());

    // Rutas
    app.use('/owners', ownerRoutes);
    app.use('/devices', deviceRoutes);
    app.use('/schedule', scheduleRoutes);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`API corriendo en http://localhost:${port}`);
    });
  });
