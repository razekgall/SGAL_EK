// Esquema para Radiación Solar (lecturas_radiacion.js)
const mongoose = require('mongoose');

const radiacionSchema = new mongoose.Schema({
  valor: {
    type: Number,
    required: true,
    min: 0,
    max: 1200
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
    default: 'W/m²'
  }
}, {
  timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('LecturaRadiacion', radiacionSchema);