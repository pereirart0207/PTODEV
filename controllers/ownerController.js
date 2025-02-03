const { createOwner, getOwners, verifyPIN, updateOwner } = require('../services/ownerService');
const {getDevicesByOwner} =  require('../services/deviceService');

exports.createOwner = async (req, res) => {
  try {
    const owner = await createOwner(req.body);
    res.status(201).json(owner);
  } catch (err) {
    res.status(500).json({ error: `ERROR crearing owner ${err}` });
  }
};


exports.updateOwner = async (req, res) => {
  try {
    const owner = await updateOwner(req.body);
    res.status(201).json(owner);
  } catch (err) {
    res.status(500).json({ error: `Error editing owner ${err}` });
  }
};


exports.getOwners = async (req, res) => {
  try {
    const owners = await getOwners();
    res.status(200).json(owners);
  } catch (err) {
    res.status(500).json({ error: 'Error getting owners' });
  }
};




exports.authenticateOwner = async (req, res) => {
  const { email, PIN } = req.body;

  try {
    const {owner, isMatch} = await verifyPIN(email, PIN);
    if (isMatch) {

 devices  = await getDevicesByOwner(owner.id);

      res.status(200).json({ message: 'Success', owner , devices});
    } else {
      res.status(400).json({ error: 'incorrect PIN' });
    }
  } catch (err) {
    res.status(500).json({ error: 'authentication ERROR' });
    console.error(err);
  }
};