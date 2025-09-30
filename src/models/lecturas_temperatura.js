// Esquema para Temperatura (lecturas_temperatura.js)
const mongoose = require('mongoose');

const temperaturaSchema = new mongoose.Schema({
  valor: {
    type: Number,
    required: true,
    min: -50,
    max: 60
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
    default: '°C'
  }
}, {
  timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('LecturaTemperatura', temperaturaSchema);