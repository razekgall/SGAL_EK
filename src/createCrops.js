require('dotenv').config();
const mongoose = require('mongoose');
const Crop = require('./models/crops.models');

const MONGO_URI = process.env.MONGO_URI;

// Datos de cultivos basados en la entrevista
const cropsData = [
  {
    name_crop: 'Aguacate',
    type_crop: 'Permanente',
    location: 'Lote Norte',
    description_crop: 'Cultivo permanente con producción inicial a los 2 años',
    size_m2: 5000,
    state_crop: 'habilitado'
  },
  {
    name_crop: 'Plátano',
    type_crop: 'Permanente',
    location: 'Lote Central',
    description_crop: 'Cultivo permanente con ciclo de hasta 20 años',
    size_m2: 4500,
    state_crop: 'habilitado'
  },
  {
    name_crop: 'Café',
    type_crop: 'Permanente',
    location: 'Lote Montaña',
    description_crop: 'Cultivo permanente con ciclo total de 22-24 años',
    size_m2: 8000,
    state_crop: 'habilitado'
  },
  {
    name_crop: 'Cacao',
    type_crop: 'Permanente',
    location: 'Lote Sombra',
    description_crop: 'Cultivo permanente actualmente en etapa de levante',
    size_m2: 3000,
    state_crop: 'habilitado'
  },
  {
    name_crop: 'Banano',
    type_crop: 'Permanente',
    location: 'Lote Sur',
    description_crop: 'Cultivo permanente de la familia Musácea',
    size_m2: 3500,
    state_crop: 'habilitado'
  },
  {
    name_crop: 'Hortalizas',
    type_crop: 'Temporal',
    location: 'Invernadero',
    description_crop: 'Cultivos de ciclo corto (4-6 meses) - lechuga, coles, cilantro',
    size_m2: 2000,
    state_crop: 'habilitado'
  },
  {
    name_crop: 'Maíz',
    type_crop: 'Temporal',
    location: 'Lote Rotación',
    description_crop: 'Cultivo de pancoger con ciclo semestral',
    size_m2: 2500,
    state_crop: 'habilitado'
  },
  {
    name_crop: 'Frijol',
    type_crop: 'Temporal',
    location: 'Lote Rotación',
    description_crop: 'Cultivo de pancoger con ciclo semestral',
    size_m2: 1500,
    state_crop: 'habilitado'
  },
  {
    name_crop: 'Yuca',
    type_crop: 'Temporal',
    location: 'Lote Secano',
    description_crop: 'Cultivo de pancoger con ciclo semestral',
    size_m2: 1800,
    state_crop: 'habilitado'
  },
  {
    name_crop: 'Plantas Medicinales',
    type_crop: 'Temporal',
    location: 'Jardín Botánico',
    description_crop: 'Variedades de plantas medicinales de ciclo variable',
    size_m2: 800,
    state_crop: 'habilitado'
  }
];

async function createCrops() {
  try {
    await mongoose.connect(MONGO_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });

    // Importar el modelo del contador
    const Counter = require('./models/counters/counter.model');

    // Verificar y crear contador si no existe
    const counterExists = await Counter.findById('cropId');
    if (!counterExists) {
      await Counter.create({ _id: 'cropId', seq: 1 });
      console.log('Contador de cultivos creado.');
    }

    // Verificar si ya existen cultivos
    const existingCrops = await Crop.countDocuments();
    if (existingCrops > 0) {
      console.log(`Ya existen ${existingCrops} cultivos en la base de datos.`);
      process.exit(0);
    }

    // Insertar los cultivos con IDs autoincrementales
    for (const cropData of cropsData) {
      // Obtener el siguiente ID del contador
      const counter = await Counter.findByIdAndUpdate(
        'cropId',
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      const crop = new Crop({
        cropId: counter.seq,
        ...cropData
      });

      await crop.save();
      console.log(`Cultivo creado: ${crop.name_crop} (ID: ${crop.cropId})`);
    }

    console.log('Todos los cultivos han sido creados exitosamente.');
    process.exit(0);

  } catch (error) {
    console.error('Error al crear los cultivos:', error);
    process.exit(1);
  }
}

createCrops();