// Script para crear 12 lecturas de humedad de prueba en MongoDB

require('dotenv').config();
const mongoose = require('mongoose');
const LecturaHumedad = require('../models/lecturas_humedad');

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    crearLecturas();
  })
  .catch(err => console.error('❌ Error de conexión:', err));

async function crearLecturas() {
  const sensorId = '652e1c7f9b1e8a0012345678'; // Cambia por un ObjectId válido de tu colección Sensor
  const fechaBase = new Date('2025-09-30T00:00:00Z');
  const horas = ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'];
  const valores = [30, 32, 28, 35, 40, 38, 36, 34, 33, 31, 29, 27]; // Ejemplo de valores

  const lecturas = horas.map((hora, i) => ({
    valor: valores[i],
    fecha: new Date(fechaBase.getTime() + i * 2 * 60 * 60 * 1000), // Suma 2 horas por lectura
    hora,
    sensorId
  }));

  try {
    const result = await LecturaHumedad.insertMany(lecturas);
    console.log('✅ Lecturas de humedad creadas:', result.length);
  } catch (err) {
    console.error('❌ Error al crear lecturas:', err);
  } finally {
    mongoose.disconnect();
  }
}