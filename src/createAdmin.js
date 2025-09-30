require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user.model');

const MONGO_URI = process.env.MONGO_URI;

async function createAdmin() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const Counter = require('./models/counters/counter4.model '); // Importa el modelo

  // Antes de crear el usuario admin:
  const counterExists = await Counter.findById('userId');
  if (!counterExists) {
    await Counter.create({ _id: 'userId', seq: 1 }); // Empieza en 1
    console.log('Contador de usuarios creado.');
  }

  // Verifica si ya existe un admin
  const exists = await User.findOne({ type_user: 'Administrador' });
  if (exists) {
    console.log('Ya existe un administrador.');
    process.exit(0);
  }

  const admin = new User({
    userId: 1,
    type_user: 'Administrador',
    type_ID: 'Cedula de Ciudadanía',
    num_document_identity: '18523058',
    name_user: 'Erick',
    email: 'admin@hotmail.com',
    cellphone: '3127346760',
    state_user: 'habilitado',
    password: 'admin123' 
  });

  await admin.save();
  console.log('Administrador creado exitosamente.');
  process.exit(0);
}

createAdmin().catch(err => {
  console.error('Error al crear el administrador:', err);
  process.exit(1);
});