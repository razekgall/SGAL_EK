// Esquema para Humedad (lecturas_humedad.js)
const mongoose = require('mongoose');

const humedadSchema = new mongoose.Schema({
  valor: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  fecha: {
    type: Date,
    required: true,
    index: true
  },
  hora: {
    type: String,
    required: true,
    enum: ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22']
  },
  unidad: {
    type: String,
    default: '%'
  },
  sensorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sensor'
  }
}, {
  timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('LecturaHumedad', humedadSchema);