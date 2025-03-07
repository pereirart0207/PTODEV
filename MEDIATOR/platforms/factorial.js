const axios = require('axios');

module.exports = {
  processCheckInOut: async (apiCode, cardCode) => {
    try {
      const response = await axios.post('https://api.otherplatform.com/check_time_inout', {
        api_code: apiCode,  // En otras plataformas, api_code y card_code pueden ser los mismos
        card_code: cardCode,
      });
      return response.data;  // Devuelve la respuesta de la API de la otra plataforma
    } catch (error) {
      console.error('Error interacting with Other Platform API:', error);
      throw new Error('Error with Other Platform API');
    }
  },
};
