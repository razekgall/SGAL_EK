const mongoose = require('mongoose');

const ProductionsPositionSchema = new mongoose.Schema({
  productionId: {
    type: mongoose.Schema.Types.ObjectId, // O String, según tu modelo de producción
    required: true,
    ref: 'Production'
  },
  positions: {
    type: [Number], // Array de índices de checkboxes seleccionados
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ProductionsPosition', ProductionsPositionSchema);