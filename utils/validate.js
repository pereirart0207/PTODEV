const validator = require('validator');

// Validar si un string no está vacío
const isNonEmptyString = (value) => {
  return typeof value === 'string' && value.trim().length > 0;
};

// Validar formato de correo electrónico
const isValidEmail = (email) => {
  return validator.isEmail(email);
};

// Validar número de teléfono (opcional, solo si está presente)
const isValidPhone = (phone) => {
  return !phone || validator.isMobilePhone(phone, 'any'); // Permite múltiples formatos
};

// Validar si un UUID es válido
const isValidUUID = (uuid) => {
  return validator.isUUID(uuid);
};

// Validar el formato y longitud del PIN antes de encriptarlo
const isValidPIN = (pin) => {
  return typeof pin === 'string' && pin.length >= 4 && pin.length <= 10; // Asegura un PIN de 4 a 10 caracteres
};

// Validar timestamps
const isValidTimestamp = (timestamp) => {
  return validator.isISO8601(timestamp);
};

// Validar que el tiempo de finalización sea mayor al de inicio
const isValidSchedule = (startTime, endTime) => {
  if (!isValidTimestamp(startTime)) return false;
  if (endTime && !isValidTimestamp(endTime)) return false;
  return !endTime || new Date(endTime) > new Date(startTime);
};

// Validar datos del propietario (owner)
const validateOwnerData = ({ name, email, phone, PIN }) => {
  if (!isNonEmptyString(name)) return { valid: false, message: 'El nombre es obligatorio' };
  if (!isValidEmail(email)) return { valid: false, message: 'Correo electrónico no válido' };
  if (!isValidPhone(phone)) return { valid: false, message: 'Número de teléfono no válido' };
  if (!isValidPIN(PIN)) return { valid: false, message: 'El PIN debe tener entre 4 y 10 caracteres' };
  
  return { valid: true };
};

// Validar datos del dispositivo
const validateDeviceData = ({ name, owner_id }) => {
  if (!isNonEmptyString(name)) return { valid: false, message: 'El nombre del dispositivo es obligatorio' };
  if (!isValidUUID(owner_id)) return { valid: false, message: 'ID de propietario inválido' };

  return { valid: true };
};

// Validar datos de la programación del dispositivo
const validateScheduleData = ({ device_id, start_time, end_time, action }) => {
  if (!isValidUUID(device_id)) return { valid: false, message: 'ID de dispositivo inválido' };
  if (!isValidSchedule(start_time, end_time)) return { valid: false, message: 'Horario no válido (end_time debe ser mayor que start_time)' };
  if (typeof action !== 'boolean') return { valid: false, message: 'La acción debe ser un valor booleano' };

  return { valid: true };
};

module.exports = {
  isNonEmptyString,
  isValidEmail,
  isValidPhone,
  isValidUUID,
  isValidPIN,
  isValidTimestamp,
  isValidSchedule,
  validateOwnerData,
  validateDeviceData,
  validateScheduleData
};
