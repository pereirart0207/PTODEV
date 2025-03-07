const express = require('express');
const router = express.Router();

// Importamos los módulos de las plataformas
const platformModules = {
  yfx: require('../platforms/yafiche'),
  hlb: require('../platforms/horaLaboral'),
  sesame: require('../platforms/sesameHr'),
  factorial: require('../platforms/factorial'),
};

// Endpoint POST /check_time_inout
router.post('/check_time_inout', async (req, res) => {
  const { api_code, card_code, platform_name } = req.body;

  if (!api_code || !card_code || !platform_name) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  const platformModule = platformModules[platform_name];
  if (!platformModule) {
    return res.status(400).json({ message: 'Platform not supported' });
  }

  try {
    const result = await platformModule.processCheckInOut(api_code, card_code);
    res.json(result);  // Devuelve la respuesta al cliente
  } catch (error) {
    console.error('Error in /check_time_inout route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
