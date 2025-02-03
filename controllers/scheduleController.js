// controllers/scheduleController.js
const { createSchedule, getSchedulesByDevice, deleteSchedule } = require('../services/scheduleService');

exports.createSchedule = async (req, res) => {
  try {
    const schedule = await createSchedule(req.body);
    res.status(201).json(schedule);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la programación' });
  }
};

exports.getSchedulesByDevice = async (req, res) => {
  try {
    const schedules = await getSchedulesByDevice(req.params.deviceId);
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las programaciones' });
  }
};
exports.deleteSchedule = async (req, res)=>{

  try{
  const result =  await deleteSchedule(req.params.id);
  res.status(200).json({message:  "Schedule Deleted Succesfuly"})
  }catch(err){
    res.status(500).json({error: `There was an error trying to delete the schedule: ${err}`}); 
  }

}
