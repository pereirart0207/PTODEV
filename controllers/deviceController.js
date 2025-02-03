// controllers/deviceController.js
const { createDevice, getDevicesByOwner, getDeviceById, deleteDevice, handleDeviceStatus, getHistoryByDeviceId } = require('../services/deviceService');

exports.createDevice = async (req, res) => {
  try {
    const device = await createDevice(req.body);
    res.status(201).json(device);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el dispositivo' });
  }
};

exports.deleteDevice = async (req, res) => {
    try {
      const device = await deleteDevice(req.params.id);
      res.status(201).json(device);
    } catch (err) {
      res.status(500).json({ error: 'ERROR AL ELIMINAR' });
    }
  };

exports.handleDeviceStatus =  async (req, res) => {
try{
const updatedDevice = await handleDeviceStatus(req.params.id);
res.status(200).json(updatedDevice);
}catch(err){
  res.status(500).json({ error: 'ERROR AL ACTUALIZAR' });
  console.error(err);
}
}

exports.getDevicesByOwner = async (req, res) => {
  try {
    const devices = await getDevicesByOwner(req.params.ownerId);
    res.status(200).json(devices);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los dispositivos' });
  }
};


exports.getDeviceById = async (req, res) => {
  try {
    const device = await getDeviceById(req.params.deviceId);
    res.status(200).json({message: 'DELETED succesfuly'});
  } catch (err) {
    res.status(500).json({ error: 'ERROR deleting device' });
  }
};

exports.getHistoryByDeviceId = async (req, res) =>{

try{
  const history = await getHistoryByDeviceId(req.params.id);
  res.status(200).json(history);
}catch(err){
  res.status(500).json({ error: 'ERROR getting History' });
  console.error(err);
}

};