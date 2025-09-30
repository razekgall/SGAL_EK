const express = require('express');
const router = express.Router();

// Importa los modelos de lecturas reales
const LecturaHumedad = require('../models/lecturas_humedad');
const LecturaRadiacion = require('../models/lecturas_radiacion');
const LecturaTemperatura = require('../models/lecturas_temperatura');
const LecturaLluvia = require('../models/lecturas_lluvia');

// Lecturas de humedad
router.get('/humedad', async (req, res) => {
  try {
    const datos = await LecturaHumedad.find().sort({ fecha: 1 });
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lecturas de radiación
router.get('/radiacion', async (req, res) => {
  try {
    const datos = await LecturaRadiacion.find().sort({ fecha: 1 });
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lecturas de temperatura
router.get('/temperatura', async (req, res) => {
  try {
    const datos = await LecturaTemperatura.find().sort({ fecha: 1 });
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lecturas de lluvia
router.get('/lluvia', async (req, res) => {
  try {
    const datos = await LecturaLluvia.find().sort({ fecha: 1 });
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dashboard con todas las lecturas
router.get('/dashboard', async (req, res) => {
  try {
    const [humedad, radiacion, temperatura, lluvia] = await Promise.all([
      LecturaHumedad.find().sort({ fecha: 1 }),
      LecturaRadiacion.find().sort({ fecha: 1 }),
      LecturaTemperatura.find().sort({ fecha: 1 }),
      LecturaLluvia.find().sort({ fecha: 1 }),
    ]);
    res.json({ humedad, radiacion, temperatura, lluvia });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nueva lectura de humedad
router.post('/humedad', async (req, res) => {
  try {
    const { valor, fecha, hora, sensorId } = req.body;
    const lectura = new LecturaHumedad({ valor, fecha, hora, sensorId });
    await lectura.save();
    res.status(201).json(lectura);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;