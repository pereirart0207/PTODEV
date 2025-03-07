const axios = require('axios');

module.exports = {
  processCheckInOut: async (apiCode, cardCode) => {
    try {
      const response = await axios.post('https://api.yfx.com/check_time_inout', {
        reader_code: apiCode,  // En YFX, api_code se convierte en reader_code
        card_code: cardCode,
      });
      return response.data;  // Devuelve la respuesta de la API de YFX
    } catch (error) {
      console.error('Error interacting with YFX API:', error);
      throw new Error('Error with YFX API');
    }
  },
};
