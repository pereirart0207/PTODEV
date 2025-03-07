const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const checkTimeRoute = require('./routes/checkTime');

// Cargar configuraciones desde el archivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Rutas
app.use('/', checkTimeRoute);


// Middleware para verificar la API key
app.use((req, res, next) => {
  const apiKey = req.headers['authentication-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
