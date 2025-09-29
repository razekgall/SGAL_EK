const mongoose = require('mongoose'); // <- Importa mongoose, una librería ODM (Object Data Modeling) para trabajar con MongoDB de forma orientada a objetos.

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB se ha conectado!');
  } catch (err) {
    console.error('MongoDB error en la conexión!', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
